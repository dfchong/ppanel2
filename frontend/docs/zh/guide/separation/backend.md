# 后端分离部署

本指南将帮助您独立部署 PPanel 后端服务，适用于前后端分离部署场景。

## 概述

后端分离部署允许您将 PPanel 后端服务部署在独立的服务器上，提供 API 服务给前端应用。这种部署方式具有以下优势：

- 🚀 独立扩展后端服务性能
- 🔒 更好的安全隔离
- 🌐 支持多前端实例连接同一后端
- 🛠️ 便于后端服务的独立维护和升级

## 系统要求

### 最低配置
- CPU: 1 核心
- 内存: 1 GB
- 存储: 10 GB
- 操作系统: Linux (推荐 Ubuntu 20.04+, Debian 11+, CentOS 8+)

### 推荐配置
- CPU: 2 核心以上
- 内存: 2 GB 以上
- 存储: 20 GB 以上

## 部署方式

### 方式一：Docker 部署（推荐）

#### 1. 安装 Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. 创建配置文件

创建后端配置文件 `config.yaml`：

```yaml
# 监听地址与端口（顶层键，注意大写）
Host: 0.0.0.0
Port: 8080

# 数据库配置：Addr 为「主机:端口」，Driver 支持 postgres 与 mysql
Database:
  Driver: postgres
  Addr: localhost:5432
  Username: ppanel
  Password: your_password
  Dbname: ppanel
  Config: sslmode=disable&TimeZone=Asia%2FShanghai

# Redis 配置：Host 同样为「主机:端口」
Redis:
  Host: localhost:6379
  Pass: ""
  DB: 0

# JWT 配置：AccessExpire 单位为秒
JwtAuth:
  AccessSecret: "用 openssl rand -base64 32 生成"
  AccessExpire: 604800
```

::: warning 跨域需要在反向代理层处理
后端没有 CORS 配置项，也不会自行下发 `Access-Control-Allow-Origin`。前后端分离部署时，请把前端与 API 收敛到同一域名下（例如 `/api` 反代到后端），或在 Nginx/Caddy 上添加 CORS 响应头。
:::

#### 3. 准备 PostgreSQL 数据库

```bash
# 使用 Docker 运行 PostgreSQL
docker run -d \
  --name ppanel-postgres \
  -e POSTGRES_DB=ppanel \
  -e POSTGRES_USER=ppanel \
  -e POSTGRES_PASSWORD=your_password \
  -e TZ=Asia/Shanghai \
  -p 5432:5432 \
  -v ppanel-postgres-data:/var/lib/postgresql/data \
  postgres:18-alpine

# 等待数据库就绪
until docker exec ppanel-postgres pg_isready -U ppanel -d ppanel; do sleep 1; done
```

#### 4. 准备 Redis

```bash
# 使用 Docker 运行 Redis
docker run -d \
  --name ppanel-redis \
  -p 6379:6379 \
  -v ppanel-redis-data:/data \
  redis:7-alpine
```

#### 5. 运行后端服务

```bash
# 拉取后端镜像
docker pull ppanel/ppanel-server:latest

# 创建网络，让各容器通过服务名互访（--link 已废弃）
docker network create ppanel-net 2>/dev/null || true
docker network connect ppanel-net ppanel-postgres
docker network connect ppanel-net ppanel-redis

# 运行后端容器：镜像默认读取 /app/etc/ppanel.yaml
docker run -d \
  --name ppanel-backend \
  --network ppanel-net \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/etc/ppanel.yaml:ro \
  ppanel/ppanel-server:latest
```

::: warning 容器内的数据库地址
使用上面的网络后，配置文件里要把地址改成容器名：`Addr: ppanel-postgres:5432`、`Host: ppanel-redis:6379`。填 `localhost` 会指向后端容器自身，连接必然失败。
:::

#### 6. 初始化数据库

```bash
# 执行数据库迁移
docker exec ppanel-backend ./ppanel migrate
```

### 方式二：二进制部署

#### 1. 下载后端程序

```bash
# 下载最新版本
wget https://github.com/perfect-panel/ppanel/releases/latest/download/ppanel-linux-amd64.tar.gz

# 解压
tar -xzf ppanel-linux-amd64.tar.gz
cd ppanel

# 赋予执行权限
chmod +x ppanel
```

#### 2. 配置后端服务

创建配置文件 `config.yaml`（内容同上 Docker 部署方式）。

#### 3. 安装并配置 PostgreSQL

```bash
# Debian/Ubuntu，使用 PostgreSQL 官方仓库
sudo apt update
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
sudo apt install -y postgresql-18

# 创建数据库和角色
sudo -u postgres psql <<EOF
CREATE ROLE ppanel WITH LOGIN PASSWORD 'your_password';
CREATE DATABASE ppanel OWNER ppanel ENCODING 'UTF8';
EOF
```

#### 4. 安装并配置 Redis

```bash
# Ubuntu/Debian
sudo apt install redis-server -y
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### 5. 初始化数据库

服务首次启动时会自动建表，无需手动执行迁移。

若是从 MySQL/MariaDB 迁移到 PostgreSQL，可使用内置命令搬运既有数据：

```bash
./ppanel-server migrate mysql2postgres --help
```

#### 6. 创建 systemd 服务

创建服务文件 `/etc/systemd/system/ppanel.service`：

```ini
[Unit]
Description=PPanel Backend Service
After=network.target postgresql.service redis-server.service

[Service]
Type=simple
User=ppanel
WorkingDirectory=/opt/ppanel
ExecStart=/opt/ppanel/ppanel-server run --config /opt/ppanel/etc/ppanel.yaml
Restart=on-failure
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
# 创建专用用户
sudo useradd -r -s /bin/false ppanel

# 移动文件到安装目录
sudo mkdir -p /opt/ppanel
sudo mv ppanel config.yaml /opt/ppanel/
sudo chown -R ppanel:ppanel /opt/ppanel

# 启动服务
sudo systemctl daemon-reload
sudo systemctl start ppanel
sudo systemctl enable ppanel

# 查看服务状态
sudo systemctl status ppanel
```

## 配置反向代理

### Nginx 配置

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    # HTTPS 重定向（推荐配置 SSL 证书）
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# HTTPS 配置示例
# server {
#     listen 443 ssl http2;
#     server_name api.your-domain.com;
#
#     ssl_certificate /path/to/cert.pem;
#     ssl_certificate_key /path/to/key.pem;
#
#     location / {
#         proxy_pass http://127.0.0.1:8080;
#         # ... 其他配置同上
#     }
# }
```

重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy 配置

```caddy
api.your-domain.com {
    reverse_proxy localhost:8080
}
```

## 验证部署

### 健康检查

```bash
# 检查后端服务是否运行
curl http://localhost:8080/api/health

# 预期输出
# {"status":"ok","version":"1.0.0"}
```

### 测试 API

```bash
# 测试公共 API
curl http://localhost:8080/api/v1/ping

# 预期输出
# {"message":"pong"}
```

## 配置方式说明

后端只从 YAML 配置文件读取配置，**不支持通过环境变量覆盖配置项**。容器部署时请挂载配置文件：

```bash
docker run -d \
  --name ppanel-backend \
  --network ppanel-net \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/etc/ppanel.yaml:ro \
  ppanel/ppanel-server:latest
```

镜像内默认读取 `/app/etc/ppanel.yaml`，也可以用 `--config` 指定其他路径：

```bash
docker run -d \
  --name ppanel-backend \
  --network ppanel-net \
  -p 8080:8080 \
  -v $(pwd)/etc:/app/etc:ro \
  ppanel/ppanel-server:latest \
  run --config /app/etc/my-config.yaml
```

## 安全建议

1. **使用强密码**：为数据库和 JWT 密钥设置强密码
2. **配置防火墙**：仅开放必要端口（如 80, 443）
3. **启用 HTTPS**：使用 SSL/TLS 证书加密通信
4. **CORS 配置**：仅允许可信的前端域名访问
5. **定期备份**：定期备份数据库和配置文件
6. **监控日志**：定期检查应用日志和系统日志

## 故障排查

### 服务无法启动

```bash
# 查看服务日志
sudo journalctl -u ppanel -n 50 --no-pager

# Docker 查看日志
docker logs ppanel-backend
```

### 数据库连接失败

```bash
# 测试 PostgreSQL 连接
psql -h localhost -U ppanel -d ppanel -c "SELECT 1;"

# 检查 PostgreSQL 服务状态
sudo systemctl status postgresql
```

### Redis 连接失败

```bash
# 测试 Redis 连接
redis-cli ping

# 检查 Redis 服务状态
sudo systemctl status redis-server
```

### CORS 错误

后端不提供 CORS 配置，跨域需在反向代理层解决。推荐把前端与 API 放在同一域名下，例如 Nginx：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

若必须跨域，则在代理层补充响应头（`Access-Control-Allow-Origin` 等），并确保 `OPTIONS` 预检请求被正确处理。

## 性能优化

### 数据库连接池

`Database` 段中可调的连接池与慢查询阈值：

```yaml
Database:
  MaxIdleConns: 10      # 空闲连接数
  MaxOpenConns: 100     # 最大连接数，按并发量调整
  SlowThreshold: 1000   # 慢查询日志阈值（毫秒）
```

### 索引

表结构由服务启动时自动迁移并已包含常用索引，通常无需手工干预。如果确认某类查询存在瓶颈，再针对实际慢查询日志补充索引。

### 反向代理

Gzip 压缩、并发连接数、请求体大小等属于接入层配置，请在 Nginx 或 Caddy 上设置，后端不提供对应选项。

## 升级指南

### Docker 升级

```bash
# 拉取最新镜像
docker pull ppanel/ppanel-server:latest

# 停止旧容器
docker stop ppanel-backend

# 备份数据
docker exec ppanel-postgres pg_dump -U ppanel ppanel > backup.sql

# 删除旧容器
docker rm ppanel-backend

# 运行新容器（表结构会在启动时自动迁移）
docker run -d \
  --name ppanel-backend \
  --network ppanel-net \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/etc/ppanel.yaml:ro \
  ppanel/ppanel-server:latest
```

### 二进制升级

```bash
# 停止服务
sudo systemctl stop ppanel

# 备份旧版本
sudo cp /opt/ppanel/ppanel-server /opt/ppanel/ppanel-server.backup

# 备份数据库
pg_dump -h localhost -U ppanel ppanel > backup.sql

# 下载新版本
wget https://github.com/perfect-panel/backend/releases/latest/download/ppanel-server-linux-amd64.tar.gz
tar -xzf ppanel-server-linux-amd64.tar.gz

# 替换文件（表结构会在启动时自动迁移）
sudo mv ppanel-server /opt/ppanel/
sudo chown ppanel:ppanel /opt/ppanel/ppanel-server

# 启动服务
sudo systemctl start ppanel
```

## 下一步

- [前端分离部署](./frontend.md) - 部署前端应用
- [节点端安装](../node/installation.md) - 部署节点服务
- [API 文档](/zh/api/reference) - 查看完整 API 文档
