# 服务器管理

管理代理服务器的基础信息、协议配置和运行状态,并配置全局节点参数。

## 页面组成

服务器管理页面包含以下模块:

### 1. 动态倍率配置

位于页面顶部的卡片,用于定义不同时段的流量计费倍率。

**功能特性:**
- **时段管理**: 定义多个时间段,每个时段包含:
  - 开始时间 (Start time): 格式为 HH:MM:SS
  - 结束时间 (End time): 格式为 HH:MM:SS
  - 倍率 (Multiplier): 该时段的流量计费倍数
- **动态计费**: 在不同时间段应用不同倍率,如高峰时段可设置更高倍率
- **灵活配置**: 支持添加、编辑、删除时间段
- **立即生效**: 保存后实时应用于流量统计

**使用场景:**
- 高峰/低峰分时计费
- 节假日特殊计费
- 限制高峰时段流量使用

### 2. 节点配置

位于页面顶部的卡片,配置节点通信和全局策略。

**基础配置 (Basic Configuration):**
- **节点密钥 (Node Secret)**: 节点与服务器通信的认证密钥
- **节点拉取间隔 (Node Pull Interval)**: 节点从服务器拉取配置的时间间隔(秒)
- **节点推送间隔 (Node Push Interval)**: 节点向服务器推送状态的时间间隔(秒)
- **流量报告阈值 (Traffic Report Threshold)**: 触发流量报告的字节数阈值
- **IP 策略 (IP Strategy)**: 选择 prefer_ipv4 或 prefer_ipv6

**DNS 配置 (DNS Configuration):**
- **协议 (Protocol)**: tcp, udp, tls, https, quic
- **地址 (Address)**: DNS 服务器地址
- **域名 (Domains)**: 使用该 DNS 解析的域名列表
- 支持配置多个 DNS 服务器

**出站规则 (Outbound Rules):**
为特定流量配置出站代理:
- **名称 (Name)**: 规则标识
- **协议 (Protocol)**: 代理协议类型
- **地址 (Address)**: 代理服务器地址
- **端口 (Port)**: 代理服务器端口
- **加密方式 (Cipher)**: Shadowsocks 等协议的加密方法
- **密码 (Password)**: 代理认证密码
- **规则列表 (Rules)**: 匹配规则,如域名或 IP 范围

**屏蔽规则 (Block Rules):**
配置需要阻止的域名或 IP 列表,支持通配符和正则表达式。

### 3. 服务器列表

页面主体部分,以表格形式展示所有服务器。

**列信息:**
- **ID**: 服务器唯一标识,以徽章形式显示
- **名称 (Name)**: 服务器自定义名称
- **地址 (Address)**: 显示国家/城市/IP 地址,使用徽章组件
- **协议 (Protocols)**: 显示已启用的协议列表,每个协议显示:
  - 倍率 (如 1.00x)
  - 协议类型 (如 vless, vmess, trojan, shadowsocks)
  - 端口号
- **状态 (Status)**: 在线/离线状态,带圆点指示器
  - 绿色圆点: 在线
  - 灰色圆点: 离线
- **CPU**: CPU 使用率百分比,以进度条形式显示
- **内存 (Memory)**: 内存使用率百分比,以进度条形式显示
- **磁盘 (Disk)**: 磁盘使用率百分比,以进度条形式显示
- **在线用户 (Online Users)**: 当前连接用户数

**操作功能:**
- **搜索**: 根据关键词快速筛选服务器
- **排序**: 通过拖拽行调整服务器显示顺序,排序会保存到数据库
- **分页**: 支持大量服务器的分页浏览
- **批量删除**: 选中多个服务器后批量删除(已被节点引用的服务器不可删除)

**单个服务器操作:**
- **编辑 (Edit)**: 修改服务器配置
- **连接 (Connect)**: 显示一键安装脚本
- **删除 (Delete)**: 删除服务器(已被节点引用时禁用)
- **复制 (Copy)**: 复制服务器配置创建新服务器

## 服务器表单

点击"创建 (Create)"或"编辑 (Edit)"时打开的侧边栏表单。

**基础信息:**
- **名称 (Name)**: 必填,服务器标识名称
- **国家 (Country)**: 服务器所在国家代码(如 CN, US, JP)
- **城市 (City)**: 服务器所在城市
- **地址 (Address)**: 服务器 IP 地址或域名

**协议配置:**

支持配置多种代理协议,每种协议以手风琴形式展开配置。已在节点中使用的协议类型无法禁用。

**常见协议字段:**
- **启用 (Enable)**: 开关按钮,控制是否启用该协议
- **端口 (Port)**: 监听端口号
- **倍率 (Ratio)**: 流量计费倍数,如 1.5 表示实际流量的 1.5 倍
- **加密/安全性**: 根据协议类型不同而不同

**支持的协议类型:**

1. **Shadowsocks**
   - Cipher: 加密方法(如 aes-256-gcm, chacha20-poly1305)
   - Password: 认证密码,支持生成随机密码

2. **Trojan**
   - Password: 认证密码,支持生成随机密码

3. **Vmess**
   - UUID: 用户标识,支持自动生成
   - Alter ID: 额外 ID 数量

4. **Vless**
   - UUID: 用户标识,支持自动生成
   - Flow: 流控模式(如 xtls-rprx-vision)

5. **Hysteria**
   - Up/Down Speed: 上传/下载速度限制
   - Obfs Password: 混淆密码

6. **Hysteria2**
   - Password: 认证密码
   - Obfs Password: 混淆密码

7. **TUIC**
   - UUID: 用户标识
   - Password: 认证密码
   - Congestion Control: 拥塞控制算法(如 bbr, cubic)
   - UDP Relay Mode: UDP 中继模式

**传输层配置 (Transport):**

每个协议可配置不同的传输层:
- **TCP**: 基础 TCP 传输
- **WS (WebSocket)**: WebSocket 传输
  - Path: WebSocket 路径
  - Host: WebSocket Host 头
- **gRPC**: gRPC 传输
  - Service Name: gRPC 服务名
- **HTTP/2**: HTTP/2 传输
  - Path: 请求路径
  - Host: Host 头
- **QUIC**: QUIC 协议传输
- **HTTPUpgrade**: HTTP 升级传输
- **SplitHTTP**: 分离 HTTP 传输
- **XHTTP**: 扩展 HTTP 传输

**TLS 配置:**
- **TLS**: 是否启用 TLS
- **Server Name**: SNI 服务器名称
- **ALPN**: 应用层协议协商(如 h2, http/1.1)
- **Fingerprint**: TLS 指纹(如 chrome, firefox, safari)
- **Reality**: Reality 协议配置
  - Public Key: 公钥
  - Short ID: 短 ID
  - Spider X: Spider X 参数

**高级配置:**
- **Multiplex**: 多路复用设置
- **Encryption**: 额外加密层
- **Flow Control**: 流量控制参数

**字段生成功能:**

部分字段支持自动生成,带有钥匙图标:
- **UUID**: 生成随机 UUID
- **密码**: 生成随机强密码
- **Reality 密钥对**: 生成 Public Key 和 Private Key
- **Short ID**: 生成随机短 ID

## 一键安装

点击"连接 (Connect)"按钮显示服务器节点的安装脚本。

**配置项:**
- **API Host**: 管理面板的 API 地址(自动从当前域名获取,可手动修改)
- **Server ID**: 当前服务器的唯一 ID(自动填充)
- **Secret Key**: 从节点配置中自动获取

**安装命令:**
生成的 bash 脚本包含:
```bash
wget -N https://raw.githubusercontent.com/perfect-panel/ppanel-node/master/scripts/install.sh && bash install.sh --api-host [域名] --server-id [ID] --secret-key [密钥]
```

**操作:**
- 点击"复制并关闭 (Copy and Close)"一键复制脚本并关闭弹窗
- 在服务器上执行该脚本即可自动安装并连接节点

## 在线用户查看

点击"在线用户 (Online Users)"数字可查看当前服务器的在线用户详情。

**显示信息:**
- **用户账号**: 链接到用户详情页
- **订阅 ID**: 订阅记录 ID
- **订阅名称**: 所用套餐名称
- **流量使用**: 已用流量 / 总流量(若无限制显示"Unlimited")
- **到期时间**: 订阅过期时间,已过期显示红色"Expired"徽章
- **IP 地址**: 用户连接 IP,可点击查看 IP 信息
- **连接时间**: 用户建立连接的时间

## 数据刷新

服务器状态(CPU、内存、磁盘、在线用户)根据"节点配置"中设置的"节点推送间隔"实时更新。
