<div v-pre>

# 订阅配置

配置订阅系统的全局设置和管理客户端应用的订阅模板。订阅配置决定用户如何获取和使用代理节点信息。

## 页面组成

订阅配置页面分为两大模块:

### 1. 订阅配置 (Subscription Configuration)

位于页面顶部的卡片,配置订阅系统的全局设置。

**配置选项:**

**单订阅模式 (Single Subscription Mode)**
- 类型: 开关
- 功能: 限制用户只能拥有一个激活的订阅
- 说明: 不影响已存在的订阅,仅对新订阅生效
- 使用场景: 控制订阅数量,防止账号共享

**泛域名解析 (Wildcard Resolution)**
- 类型: 开关
- 功能: 启用订阅的泛域名解析
- 说明: 允许使用通配符域名访问订阅链接
- 示例: `*.example.com` 可匹配 `sub1.example.com`, `sub2.example.com`

**订阅路径 (Subscription Path)**
- 类型: 文本输入
- 功能: 自定义订阅端点的 URL 路径
- 格式: `/your-custom-path`
- 说明: 系统重启后性能更佳
- 示例: `/api/v1/subscribe` 或 `/sub`

**订阅域名 (Subscription Domain)**
- 类型: 多行文本
- 功能: 自定义订阅链接的域名
- 格式: 每行一个域名
- 示例:
  ```
  example.com
  www.example.com
  sub.example.com
  ```
- 使用场景:
  - 使用 CDN 域名
  - 多域名负载均衡
  - 域名备份

**User-Agent 限制**
- 类型: 开关
- 功能: 启用基于 User-Agent 的访问控制
- 说明: 只允许白名单中的客户端访问订阅
- 使用场景: 防止爬虫、限制非法访问

**User-Agent 白名单**
- 类型: 多行文本
- 功能: 配置允许访问订阅的 User-Agent 列表
- 格式: 每行一个 User-Agent
- 示例:
  ```
  ClashX
  ClashForAndroid
  Clash-verge
  ```
- 说明: 已配置的应用 User-Agent 会自动包含在内

### 2. 客户端管理 (Client Management)

管理不同代理客户端的订阅模板和下载链接。

**表格列信息:**
- **默认 (Default)**: 开关按钮,设置为默认客户端
  - 默认客户端在订阅页面优先显示
  - 同时只能有一个默认客户端
- **客户端名称 (Client Name)**: 显示客户端图标和名称
- **User-Agent**: 客户端标识符,用于识别不同客户端
- **输出格式 (Output Format)**: 订阅内容的格式类型
  - Base64: Base64 编码格式
  - YAML: YAML 配置文件格式
  - JSON: JSON 数据格式
  - CONF: 配置文件格式
  - Plain Text: 纯文本格式
- **支持平台 (Supported Platforms)**: 显示该客户端支持的操作系统
  - Windows, macOS, Linux, iOS, Android, HarmonyOS
- **描述 (Description)**: 客户端详细说明

**操作功能:**
- **预览 (Preview)**: 查看生成的订阅模板内容
  - Base64 格式显示原始内容和解码内容
  - 其他格式直接显示内容
  - 支持语法高亮
- **编辑 (Edit)**: 修改客户端配置
- **删除 (Delete)**: 删除客户端配置
- **批量删除**: 选中多个客户端后批量删除

**顶部工具栏:**
- **Template Repo 链接**: 跳转到 GitHub 模板仓库
  - 地址: https://github.com/perfect-panel/subscription-template
  - 提供订阅模板示例和文档
- **添加 (Add)**: 创建新的客户端配置

## 客户端表单

点击"添加 (Add)"或"编辑 (Edit)"时打开的侧边栏表单,分为三个标签页。

### 基本信息 (Basic Info)

**图标 (Icon)**
- 类型: URL 输入 + 上传按钮
- 格式: 图片 URL 或 Base64 编码
- 示例: `https://example.com/icon.png`
- 功能: 支持直接上传图片,自动转换为 Base64

**名称 (Name)** - 必填
- 类型: 文本输入
- 功能: 客户端显示名称
- 示例: `Clash for Windows`, `V2rayN`

**User-Agent** - 必填
- 类型: 文本输入
- 功能: 客户端标识符,用于区分不同客户端
- 示例: `Clash`, `V2rayN`, `ClashX`
- 重要: 必须与客户端实际发送的 User-Agent 匹配

**描述 (Description)** - 可选
- 类型: 多行文本
- 功能: 客户端详细说明
- 内容: 客户端特性、使用说明等

### 模板 (Templates)

**输出格式 (Output Format)** - 必填
- 类型: 下拉选择
- 选项:
  - **Base64**: 传统订阅格式,适用于大多数客户端
  - **YAML**: Clash 系列客户端配置格式
  - **JSON**: JSON 格式配置,适用于支持 JSON 的客户端
  - **CONF**: 配置文件格式,如 Shadowrocket
  - **Plain Text**: 纯文本格式

**Scheme** - 可选
- 类型: 文本输入
- 功能: 自定义 URL Scheme
- 示例: `clash://`, `vmess://`
- 用途: 一键导入订阅

**模板 (Template)** - 必填
- 类型: Go Template 编辑器
- 功能: 使用 Go 模板语法编写订阅内容
- 支持: 语法高亮、代码补全
- 变量:
  - <code v-pre>{{.SiteName}}</code>: 网站名称
  - <code v-pre>{{.SubscribeName}}</code>: 订阅名称
  - <code v-pre>{{.Proxies}}</code>: 节点数组
  - <code v-pre>{{.UserInfo}}</code>: 用户信息

**模板变量说明**

详细的模板变量参考请查看：[模板变量参考](./subscribe-variables.md)

用户信息 (UserInfo) 字段：

- `Password` - 用户密码
- `ExpiredAt` - 过期时间
- `Download` - 已下载流量
- `Upload` - 已上传流量
- `Traffic` - 总流量
- `SubscribeURL` - 订阅链接

### 下载链接 (Downloads)

配置客户端的下载地址,支持多平台:

- **Windows**: Windows 平台下载链接
- **macOS**: macOS 平台下载链接
- **Linux**: Linux 平台下载链接
- **iOS**: iOS 平台下载链接
- **Android**: Android 平台下载链接
- **HarmonyOS**: 鸿蒙系统下载链接

每个平台都是可选的,填写后会在客户端列表中显示对应的平台徽章。

## 使用场景

### 场景 1: 配置 Clash 客户端

1. 点击"添加 (Add)"
2. 基本信息:
   - 名称: `Clash for Windows`
   - User-Agent: `Clash`
   - 图标: 上传 Clash 图标
3. 模板:
   - 输出格式: 选择 `YAML`
   - 模板: 编写 Clash YAML 配置模板
4. 下载链接:
   - Windows: `https://github.com/Fndroid/clash_for_windows_pkg/releases`
   - macOS: `https://github.com/yichengchen/clashX/releases`
5. 点击"确认 (Confirm)"

### 场景 2: 配置传统 Base64 订阅

1. 点击"添加 (Add)"
2. 基本信息:
   - 名称: `Universal`
   - User-Agent: `*`
3. 模板:
   - 输出格式: 选择 `Base64`
   - 模板: 编写标准 vmess/vless URI 列表
4. 设置为默认客户端
5. 点击"确认 (Confirm)"

### 场景 3: 限制订阅访问

1. 打开"订阅配置"
2. 启用"User-Agent 限制"
3. 在"User-Agent 白名单"中添加:
   ```
   Clash
   V2rayN
   ClashX
   Quantumult
   ```
4. 保存配置
5. 只有白名单中的客户端能访问订阅

### 场景 4: 使用自定义域名

1. 打开"订阅配置"
2. 在"订阅域名"中添加:
   ```
   sub.example.com
   cdn.example.com
   ```
3. 配置"订阅路径": `/api/sub`
4. 保存配置
5. 用户可使用 `https://sub.example.com/api/sub/{token}` 访问订阅

## 模板编写指南

### Base64 格式示例
```go
{{range .Proxies}}{{.Type}}://{{.UUID}}@{{.Server}}:{{.Port}}?security={{.Security}}&sni={{.SNI}}#{{.Name}}
{{end}}
```

### Clash YAML 格式示例
```yaml
proxies:
{{range .Proxies}}
  - name: {{.Name}}
    type: {{.Type}}
    server: {{.Server}}
    port: {{.Port}}
    {{if eq .Type "vless"}}uuid: {{.UUID}}{{end}}
    {{if eq .Type "vmess"}}uuid: {{.UUID}}{{end}}
    {{if eq .Type "trojan"}}password: {{.Password}}{{end}}
{{end}}
```

### 条件判断示例
```go
{{range .Proxies}}
{{if eq .Type "vless"}}
vless://{{.UUID}}@{{.Server}}:{{.Port}}
{{else if eq .Type "vmess"}}
vmess://{{.UUID}}@{{.Server}}:{{.Port}}
{{end}}
{{end}}
```

## 注意事项

1. **User-Agent 匹配**: 必须与客户端实际发送的 User-Agent 完全匹配,否则无法正确识别
2. **模板语法**: 使用 Go Template 语法,语法错误会导致订阅生成失败
3. **输出格式**: 确保模板输出与选择的格式匹配,如 YAML 格式需要正确的缩进
4. **默认客户端**: 同时只能有一个默认客户端,设置新默认会取消旧的
5. **域名配置**: 自定义域名需要在 DNS 和 Web 服务器中正确配置
6. **路径更改**: 订阅路径更改后,需要重启系统以获得最佳性能
7. **预览功能**: 使用预览功能测试模板是否正确生成
8. **模板仓库**: 参考 GitHub 模板仓库获取更多示例和最佳实践

</div>
