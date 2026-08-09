# Template Variable Reference

## Proxy Object Fields

### Basic Fields
- `Name` - Node name
- `Server` - Server address
- `Port` - Server port
- `Type` - Protocol type
- `Tags` - Tag array
- `Sort` - Sort order

### Security Options
- `Security` - Security protocol
- `SNI` - TLS server name
- `AllowInsecure` - Allow insecure connections
- `Fingerprint` - Client fingerprint
- `RealityServerAddr` - Reality server address
- `RealityPublicKey` - Reality public key
- `RealityShortId` - Reality short ID

### Transport Options
- `Transport` - Transport protocol (ws, http, grpc)
- `Host` - Host for WebSocket/HTTP
- `Path` - Path for HTTP/HTTPS
- `ServiceName` - gRPC service name

### Protocol-Specific Fields

#### Shadowsocks
- `Method` - Encryption method
- `Cipher` - Cipher algorithm
- `ServerKey` - Server key

#### Vmess/Vless
- `UUID` - User ID
- `Flow` - Flow control mode
- `Encryption` - Encryption type

#### Trojan
- `Password` - Password

#### Hysteria2
- `UpMbps` - Upload bandwidth
- `DownMbps` - Download bandwidth
- `ObfsPassword` - Obfuscation password

#### TUIC
- `CongestionController` - Congestion control algorithm
- `UDPRelayMode` - UDP relay mode

## UserInfo Fields

- `Password` - User password
- `ExpiredAt` - Expiration time
- `Download` - Downloaded traffic
- `Upload` - Uploaded traffic
- `Traffic` - Total traffic
- `SubscribeURL` - Subscription link
