# ppanel2 —— lightree.uk 域名接入（Cloudflare 侧操作）

> 适用范围：后端已部署 `dfchong/ppanel2:0.3`（namespace `ppanel2`），
> CORS 白名单由后端源码内置并从 `ppanel-cors` ConfigMap 读取（支持热重载）。
> **已不再使用 Cloudflare Worker / Caddy 处理 CORS。**
>
> 隧道为 **Token 托管模式**（`default` ns 的 `cloudflare-tunnel`，`run --token`），
> 因此隧道入口（Public Hostname）必须在 Cloudflare Dashboard / API 中配置，k3s 内无需改动。

## 域名分工

| 域名 | 用途 | 指向 |
|---|---|---|
| `users007.lightree.uk` | 用户端前端（Cloudflare Pages） | Pages 自定义域 |
| `xxadmin.lightree.uk`  | 管理端前端（Cloudflare Pages） | Pages 自定义域 |
| `ppapi.lightree.uk`    | API（浏览器跨域，CORS 由后端处理） | 隧道 → `ppanel-server.ppanel2.svc.cluster.local:8080` |
| `subpp.lightree.uk`    | 订阅地址（客户端直连，无 CORS） | 隧道 → `ppanel-server.ppanel2.svc.cluster.local:8080` |

浏览器跨域请求 Origin 为 `users007.lightree.uk` / `xxadmin.lightree.uk`，
它们必须出现在后端 `ppanel-cors` ConfigMap 的 `AllowOrigins` 中（当前已配置）。

## 1. 隧道 Public Hostname（Zero Trust → Networks → Tunnels → 选择隧道 → Public Hostnames → Add）

| Hostname | Service | 说明 |
|---|---|---|
| `ppapi.lightree.uk` | `http://ppanel-server.ppanel2.svc.cluster.local:8080` | API，`/v1/...` 原样转发；浏览器跨域由后端 CORS 放行 |
| `subpp.lightree.uk` | `http://ppanel-server.ppanel2.svc.cluster.local:8080` | 订阅 `/api/subscribe/...`，客户端直连 |

> 说明：`subpp` 使用与 API 相同的后端 Service；订阅路径为 `https://subpp.lightree.uk/api/subscribe/...`。

## 2. DNS 记录（DNS → 你的站点 lightree.uk）

| 类型 | 名称 | 目标 | 代理 |
|---|---|---|---|
| CNAME | `ppapi` | 隧道域名 `<tunnel-uuid>.cfargotunnel.com` | Proxied（橙色云） |
| CNAME | `subpp` | 隧道域名 `<tunnel-uuid>.cfargotunnel.com` | Proxied（橙色云） |
| A/AAAA/CNAME | `users007` | 由 Pages 自定义域自动创建 | Proxied |
| A/AAAA/CNAME | `xxadmin` | 由 Pages 自定义域自动创建 | Proxied |

> 托管模式隧道的 CNAME 目标可从 Zero Trust 隧道页面复制（形如 `<uuid>.cfargotunnel.com`）。

## 3. Cloudflare Pages 前端

### 用户端（项目 `ppanel-user-web`）
- 自定义域：`users007.lightree.uk`
- 构建：见 [`../cloudflare/pages-user/构建配置.md`](../cloudflare/pages-user/构建配置.md)
- 环境变量（Production）：
  ```text
  VITE_API_BASE_URL=https://ppapi.lightree.uk
  VITE_API_PREFIX=
  VITE_CDN_URL=https://cdn.jsdmirror.com
  VITE_TUTORIAL_DOCUMENT=true
  VITE_SHOW_LANDING_PAGE=true
  NODE_VERSION=20
  ```

### 管理端（项目 `ppanel-admin-web`）
- 自定义域：`xxadmin.lightree.uk`
- 构建：见 [`../cloudflare/pages-admin/构建配置.md`](../cloudflare/pages-admin/构建配置.md)
- 环境变量（Production）：
  ```text
  VITE_API_BASE_URL=https://ppapi.lightree.uk
  VITE_API_PREFIX=
  VITE_CDN_URL=https://cdn.jsdmirror.com
  VITE_TUTORIAL_DOCUMENT=true
  NODE_VERSION=20
  ```

> ⚠️ `VITE_API_PREFIX` **必须留空**：后端路由为 `/v1/...`（无 `/api` 前缀，除 edge），
> 且已无 Worker 网关剥除前缀。前端最终请求 `https://ppapi.lightree.uk/v1/...`。

## 4. 后端侧已完成项（无需再操作）

- 镜像 `dfchong/ppanel2:0.3` 已构建并推送（含白名单 CORS + `etc/cors.d/cors.yaml` 目录挂载热重载）。
- `ppanel-cors` ConfigMap 白名单：`https://users007.lightree.uk`、`https://xxadmin.lightree.uk`。
- 订阅域名 `subpp.lightree.uk` 已通过管理端 API 写入数据库系统配置（`/v1/admin/system/subscribe_config`），
  `site/config` 返回 `subscribe_domain=subpp.lightree.uk`。
- 订阅路径当前为 `/api/subscribe`（数据库系统配置，覆盖 Secret 中的 `/v1/subscribe/config`）。

## 5. 端到端验证清单

```bash
# API 域名（后端直连，经隧道）
curl -i https://ppapi.lightree.uk/v1/common/site/config | head -20
# 应返回 HTTP 200 + JSON（code/msg）；后端一律 HTTP 200，勿用非 2xx 判断业务错误

# 订阅路径存在（token 无效也会返回 200 结构体或 500，说明路由已注册）
curl -i https://subpp.lightree.uk/api/subscribe?token=probe | head -20

# CORS：浏览器 Origin 应放行（204）
curl -i -X OPTIONS \
  -H "Origin: https://users007.lightree.uk" \
  -H "Access-Control-Request-Method: GET" \
  https://ppapi.lightree.uk/v1/common/site/config | head -8
# 应出现 access-control-allow-origin: https://users007.lightree.uk

# 非白名单 Origin 应被拒（403）
curl -i -X OPTIONS \
  -H "Origin: https://evil.example.com" \
  -H "Access-Control-Request-Method: GET" \
  https://ppapi.lightree.uk/v1/common/site/config | head -8
```

浏览器验证：分别打开 `https://users007.lightree.uk` 与 `https://xxadmin.lightree.uk`，
用默认管理员 `admin@ppanel.dev / password` 登录，确认无 CORS 报错。

## 6. 修改白名单（热重载，无需重启）

```bash
# 编辑 deploy/k3s-ppanel2/02-ppanel-cors-configmap.yaml 后：
kubectl apply -f deploy/k3s-ppanel2/02-ppanel-cors-configmap.yaml
# 等待 kubelet 同步（数秒~1分钟）+ 后端 10s 轮询后自动生效
```
