# 模板变量参考

## 节点对象 (Proxy) 字段

### 基础字段
- `Name` - 节点名称
- `Server` - 服务器地址
- `Port` - 服务器端口
- `Type` - 协议类型
- `Tags` - 标签数组
- `Sort` - 排序序号

### 安全选项
- `Security` - 安全协议
- `SNI` - TLS 服务器名称
- `AllowInsecure` - 是否允许不安全连接
- `Fingerprint` - 客户端指纹
- `RealityServerAddr` - Reality 服务器地址
- `RealityPublicKey` - Reality 公钥
- `RealityShortId` - Reality 短ID

### 传输选项
- `Transport` - 传输协议,如 ws、http、grpc
- `Host` - WebSocket/HTTP 的 Host
- `Path` - HTTP/HTTPS 路径
- `ServiceName` - gRPC 服务名

### 协议特定字段

#### Shadowsocks
- `Method` - 加密方法
- `Cipher` - 加密算法
- `ServerKey` - 服务器密钥

#### Vmess/Vless
- `UUID` - 用户ID
- `Flow` - 流控模式
- `Encryption` - 加密方式

#### Trojan
- `Password` - 密码

#### Hysteria2
- `UpMbps` - 上行带宽
- `DownMbps` - 下行带宽
- `ObfsPassword` - 混淆密码

#### TUIC
- `CongestionController` - 拥塞控制算法
- `UDPRelayMode` - UDP 中继模式

## 用户信息 (UserInfo) 字段

- `Password` - 用户密码
- `ExpiredAt` - 过期时间
- `Download` - 已下载流量
- `Upload` - 已上传流量
- `Traffic` - 总流量
- `SubscribeURL` - 订阅链接
