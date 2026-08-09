# Node Management

Manage user-facing proxy nodes, configure node-server associations, entry addresses, and tags. Nodes are the actual endpoints users connect to, and one server can correspond to multiple nodes.

## Page Components

### Node List

Display all node configuration information in table format.

**Column Information:**
- **Enabled**: Toggle switch to control whether the node is visible to users in real-time
  - On: Node appears in subscriptions, users can connect
  - Off: Node is hidden, users cannot connect
  - Takes effect immediately without restart
- **Name**: Node display name, shown in user's client
- **Address:Port**: Entry address and port for user connections
- **Server**: Shows associated server name and IP address
  - Format: `Server Name:Server IP`
- **Protocol:Port**: Proxy protocol type and server listening port
  - Format: `Protocol Type:Server Port`
  - Examples: `vless:443`, `vmess:80`, `trojan:8443`
- **Tags**: Node grouping tags, displayed as badges
  - Used for permission grouping and plan binding
  - Used for traffic distribution policies
  - Supports multiple tags

**Operation Features:**
- **Search**: Quickly filter nodes by keyword
- **Sorting**: Adjust node display order by dragging rows, affects node order in user subscriptions
- **Pagination**: Support paging for large number of nodes
- **Batch Delete**: Delete multiple selected nodes

**Individual Node Operations:**
- **Edit**: Modify node configuration
- **Delete**: Delete node
- **Copy**: Copy node configuration to create new node (new node disabled by default)

## Node Form

A sidebar form that opens when clicking "Create" or "Edit".

### Form Fields

**1. Server** - Required
- Select the physical server associated with the node
- Dropdown shows: `Server Name (Server IP)`
- Triggers smart autofill upon selection

**2. Protocol** - Required
- Select the proxy protocol to use
- Dropdown only shows protocols enabled on selected server
- Format: `Protocol Type (Port Number)`
- Supported protocols: shadowsocks, vmess, vless, trojan, hysteria, tuic, anytls, naive, http, socks, mieru
- Automatically fills corresponding port upon selection

**3. Name** - Required
- Display name of the node
- Shown in user's proxy client
- Supports autofill (from server name)

**4. Address** - Required
- Entry address for user connections
- Can be domain name or IP address
- Supports autofill (from server address)
- Can be manually changed to CDN domain or other entry

**5. Port** - Required
- Entry port number for user connections
- Range: 1-65535
- Supports autofill (from protocol port)
- Can be manually changed to different port (e.g., when using port forwarding)

**6. Tags** - Optional
- Node grouping tags, supports multiple tags
- Can select from existing tags or enter new tags
- Use Enter key or comma (,) to add multiple tags
- Purpose:
  - **Permission Grouping**: Bind with plans to control visible nodes for different plan users
  - **Traffic Strategy**: Used for node traffic distribution and load balancing

### Smart Autofill Mechanism

The form has smart autofill functionality to improve configuration efficiency:

**Trigger Conditions:**
1. When selecting server
2. When selecting protocol

**Fill Rules:**
- **After selecting server**:
  - Name autofills with server name
  - Address autofills with server IP
  - Protocol automatically selects first available protocol
  - Port autofills with corresponding protocol port

- **After selecting protocol**:
  - Port autofills with the protocol's port number

**Manual Modification:**
- After manually modifying any field, that field will no longer autofill
- Reselecting server or protocol refreshes autofill status

## Use Cases

### Scenario 1: Create Basic Node
1. Click "Create" button
2. Select server (other fields autofill)
3. Confirm or adjust autofilled configuration
4. Click "Confirm"

### Scenario 2: Create CDN Node
1. Click "Create" button
2. Select server
3. Change name to: `Hong Kong 01 [CDN]`
4. Change address to CDN domain: `hk01.cdn.example.com`
5. Change port to CDN port: `443` or `80`
6. Click "Confirm"

### Scenario 3: Tag Group Management
**For Plan Binding:**
- Premium plan nodes: Add tags `premium`, `vip`
- Standard plan nodes: Add tag `standard`
- Trial plan nodes: Add tag `trial`
- Bind tags in product management to show different nodes for different plans

**For Region Classification:**
- Hong Kong nodes: Add tags `hk`, `asia`
- US nodes: Add tags `us`, `americas`
- Japan nodes: Add tags `jp`, `asia`

### Scenario 4: Batch Management
1. Use search to filter specific nodes
2. Check multiple nodes
3. Click batch delete or batch operations
4. Confirm operation

## Relationship Between Nodes and Servers

**Server:**
- Physical server or VPS
- Runs proxy service programs
- Configures listening protocols and ports
- One server can configure multiple protocols

**Node:**
- User-visible connection endpoint
- Associated with a specific protocol on a server
- Configures user connection entry address (can differ from server address)
- One server can create multiple nodes

**Example:**
```
Server: Hong Kong-HK01 (192.168.1.100)
├── Protocol: vless:443
├── Protocol: vmess:80
└── Protocol: trojan:8443

Node Configuration:
1. Node Name: Hong Kong 01 [Direct]
   - Server: Hong Kong-HK01
   - Protocol: vless:443
   - Address: 192.168.1.100
   - Port: 443

2. Node Name: Hong Kong 01 [CDN]
   - Server: Hong Kong-HK01
   - Protocol: vmess:80
   - Address: hk01.cdn.example.com
   - Port: 443 (CDN port)

3. Node Name: Hong Kong 01 [VIP]
   - Server: Hong Kong-HK01
   - Protocol: trojan:8443
   - Address: 192.168.1.100
   - Port: 8443
   - Tags: premium, vip
```

## Important Notes

1. **Protocol Must Be Enabled**: Can only select protocols already enabled on the server; disabled protocols won't appear in dropdown
2. **Delete Impact**: Deleting a node will cause users using that node to be unable to connect, proceed with caution
3. **Disable vs Delete**: For temporarily taking a node offline, use "disable" instead of delete for easy restoration
4. **Tag Planning**: Recommend planning tag system in advance for easier batch management of plans and nodes
5. **Address Configuration**: When using CDN, ensure CDN is correctly configured to origin to server address
6. **Port Mapping**: If entry port differs from server listening port (e.g., using port forwarding), ensure network layer is configured correctly
