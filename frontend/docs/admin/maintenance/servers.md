# Server Management

Manage proxy servers' basic information, protocol configuration, and runtime status, as well as configure global node parameters.

## Page Components

The Server Management page consists of the following modules:

### 1. Dynamic Multiplier

A card at the top of the page for defining traffic billing multipliers for different time periods.

**Features:**
- **Time Slot Management**: Define multiple time periods, each containing:
  - Start time: Format HH:MM:SS
  - End time: Format HH:MM:SS
  - Multiplier: Traffic billing multiplier for this period
- **Dynamic Billing**: Apply different multipliers at different times, e.g., higher rates during peak hours
- **Flexible Configuration**: Support adding, editing, and deleting time periods
- **Immediate Effect**: Applied to traffic statistics immediately after saving

**Use Cases:**
- Peak/off-peak time-based billing
- Holiday special billing
- Limit traffic usage during peak hours

### 2. Node Configuration

A card at the top of the page for configuring node communication and global policies.

**Basic Configuration:**
- **Node Secret**: Authentication key for node-server communication
- **Node Pull Interval**: Time interval (seconds) for nodes to pull configuration from server
- **Node Push Interval**: Time interval (seconds) for nodes to push status to server
- **Traffic Report Threshold**: Byte threshold for triggering traffic reports
- **IP Strategy**: Choose prefer_ipv4 or prefer_ipv6

**DNS Configuration:**
- **Protocol**: tcp, udp, tls, https, quic
- **Address**: DNS server address
- **Domains**: List of domains to be resolved using this DNS
- Support configuring multiple DNS servers

**Outbound Rules:**
Configure outbound proxies for specific traffic:
- **Name**: Rule identifier
- **Protocol**: Proxy protocol type
- **Address**: Proxy server address
- **Port**: Proxy server port
- **Cipher**: Encryption method for protocols like Shadowsocks
- **Password**: Proxy authentication password
- **Rules**: Matching rules, such as domain names or IP ranges

**Block Rules:**
Configure list of domains or IPs to block, supporting wildcards and regex.

### 3. Server List

The main body of the page displays all servers in a table format.

**Column Information:**
- **ID**: Server unique identifier, displayed as a badge
- **Name**: Server custom name
- **Address**: Displays country/city/IP address using badge components
- **Protocols**: Displays list of enabled protocols, each showing:
  - Multiplier (e.g., 1.00x)
  - Protocol type (e.g., vless, vmess, trojan, shadowsocks)
  - Port number
- **Status**: Online/offline status with dot indicator
  - Green dot: Online
  - Gray dot: Offline
- **CPU**: CPU usage percentage, displayed as a progress bar
- **Memory**: Memory usage percentage, displayed as a progress bar
- **Disk**: Disk usage percentage, displayed as a progress bar
- **Online Users**: Number of currently connected users

**Operation Features:**
- **Search**: Quickly filter servers by keyword
- **Sorting**: Adjust server display order by dragging rows, sorting is saved to database
- **Pagination**: Support paging for large number of servers
- **Batch Delete**: Delete multiple selected servers (servers referenced by nodes cannot be deleted)

**Individual Server Operations:**
- **Edit**: Modify server configuration
- **Connect**: Display one-click installation script
- **Delete**: Delete server (disabled when referenced by nodes)
- **Copy**: Copy server configuration to create a new server

## Server Form

A sidebar form that opens when clicking "Create" or "Edit".

**Basic Information:**
- **Name**: Required, server identifier name
- **Country**: Server country code (e.g., CN, US, JP)
- **City**: Server city
- **Address**: Server IP address or domain

**Protocol Configuration:**

Support configuration of multiple proxy protocols, each expanded in accordion format. Protocol types used in nodes cannot be disabled.

**Common Protocol Fields:**
- **Enable**: Toggle switch to control whether to enable the protocol
- **Port**: Listening port number
- **Ratio**: Traffic billing multiplier, e.g., 1.5 means 1.5 times actual traffic
- **Encryption/Security**: Varies depending on protocol type

**Supported Protocol Types:**

1. **Shadowsocks**
   - Cipher: Encryption method (e.g., aes-256-gcm, chacha20-poly1305)
   - Password: Authentication password, supports generating random password

2. **Trojan**
   - Password: Authentication password, supports generating random password

3. **Vmess**
   - UUID: User identifier, supports auto-generation
   - Alter ID: Number of additional IDs

4. **Vless**
   - UUID: User identifier, supports auto-generation
   - Flow: Flow control mode (e.g., xtls-rprx-vision)

5. **Hysteria**
   - Up/Down Speed: Upload/download speed limits
   - Obfs Password: Obfuscation password

6. **Hysteria2**
   - Password: Authentication password
   - Obfs Password: Obfuscation password

7. **TUIC**
   - UUID: User identifier
   - Password: Authentication password
   - Congestion Control: Congestion control algorithm (e.g., bbr, cubic)
   - UDP Relay Mode: UDP relay mode

**Transport Configuration:**

Each protocol can be configured with different transport layers:
- **TCP**: Basic TCP transport
- **WS (WebSocket)**: WebSocket transport
  - Path: WebSocket path
  - Host: WebSocket Host header
- **gRPC**: gRPC transport
  - Service Name: gRPC service name
- **HTTP/2**: HTTP/2 transport
  - Path: Request path
  - Host: Host header
- **QUIC**: QUIC protocol transport
- **HTTPUpgrade**: HTTP upgrade transport
- **SplitHTTP**: Split HTTP transport
- **XHTTP**: Extended HTTP transport

**TLS Configuration:**
- **TLS**: Whether to enable TLS
- **Server Name**: SNI server name
- **ALPN**: Application-Layer Protocol Negotiation (e.g., h2, http/1.1)
- **Fingerprint**: TLS fingerprint (e.g., chrome, firefox, safari)
- **Reality**: Reality protocol configuration
  - Public Key: Public key
  - Short ID: Short ID
  - Spider X: Spider X parameter

**Advanced Configuration:**
- **Multiplex**: Multiplexing settings
- **Encryption**: Additional encryption layer
- **Flow Control**: Flow control parameters

**Field Generation:**

Some fields support auto-generation with a key icon:
- **UUID**: Generate random UUID
- **Password**: Generate random strong password
- **Reality Key Pair**: Generate Public Key and Private Key
- **Short ID**: Generate random short ID

## One-Click Installation

Click the "Connect" button to display the server node installation script.

**Configuration:**
- **API Host**: API address of the management panel (automatically obtained from current domain, can be manually modified)
- **Server ID**: Unique ID of the current server (auto-filled)
- **Secret Key**: Automatically obtained from node configuration

**Install Command:**
The generated bash script contains:
```bash
wget -N https://raw.githubusercontent.com/perfect-panel/ppanel-node/master/scripts/install.sh && bash install.sh --api-host [domain] --server-id [ID] --secret-key [key]
```

**Operations:**
- Click "Copy and Close" to copy the script with one click and close the popup
- Execute the script on the server to automatically install and connect the node

## Online Users Viewing

Click the "Online Users" number to view details of currently online users on the server.

**Display Information:**
- **User Account**: Link to user detail page
- **Subscribe ID**: Subscription record ID
- **Subscribe Name**: Plan name being used
- **Traffic Usage**: Used traffic / Total traffic (displays "Unlimited" if unlimited)
- **Expire Time**: Subscription expiration time, expired shows red "Expired" badge
- **IP Address**: User connection IP, clickable to view IP information
- **Connection Time**: Time when user established connection

## Data Refresh

Server status (CPU, Memory, Disk, Online Users) is updated in real-time according to the "Node Push Interval" set in "Node Configuration".
