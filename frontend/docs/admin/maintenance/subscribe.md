<div v-pre>

# Subscribe Configuration

Configure global subscription settings and manage subscription templates for client applications. Subscription configuration determines how users retrieve and use proxy node information.

## Page Components

The Subscribe Configuration page is divided into two main modules:

### 1. Subscription Configuration

A card at the top of the page for configuring global subscription system settings.

**Configuration Options:**

**Single Subscription Mode**
- Type: Toggle switch
- Function: Limit users to one active subscription
- Note: Does not affect existing subscriptions, only applies to new ones
- Use Case: Control subscription count, prevent account sharing

**Wildcard Resolution**
- Type: Toggle switch
- Function: Enable wildcard domain resolution for subscriptions
- Note: Allows using wildcard domains to access subscription links
- Example: `*.example.com` can match `sub1.example.com`, `sub2.example.com`

**Subscription Path**
- Type: Text input
- Function: Customize URL path for subscription endpoints
- Format: `/your-custom-path`
- Note: Better performance after system restart
- Example: `/api/v1/subscribe` or `/sub`

**Subscription Domain**
- Type: Multi-line text
- Function: Customize domains for subscription links
- Format: One domain per line
- Example:
  ```
  example.com
  www.example.com
  sub.example.com
  ```
- Use Cases:
  - Use CDN domains
  - Multi-domain load balancing
  - Domain backup

**User-Agent Restriction**
- Type: Toggle switch
- Function: Enable User-Agent based access control
- Note: Only allow whitelisted clients to access subscriptions
- Use Case: Prevent crawlers, restrict unauthorized access

**User-Agent Whitelist**
- Type: Multi-line text
- Function: Configure allowed User-Agent list for subscription access
- Format: One User-Agent per line
- Example:
  ```
  ClashX
  ClashForAndroid
  Clash-verge
  ```
- Note: Configured application User-Agents are automatically included

### 2. Client Management

Manage subscription templates and download links for different proxy clients.

**Table Column Information:**
- **Default**: Toggle switch to set as default client
  - Default client is prioritized on subscription page
  - Only one default client at a time
- **Client Name**: Displays client icon and name
- **User-Agent**: Client identifier for distinguishing different clients
- **Output Format**: Format type of subscription content
  - Base64: Base64 encoded format
  - YAML: YAML configuration file format
  - JSON: JSON data format
  - CONF: Configuration file format
  - Plain Text: Plain text format
- **Supported Platforms**: Shows operating systems supported by this client
  - Windows, macOS, Linux, iOS, Android, HarmonyOS
- **Description**: Detailed client description

**Operation Features:**
- **Preview**: View generated subscription template content
  - Base64 format shows both original and decoded content
  - Other formats display content directly
  - Supports syntax highlighting
- **Edit**: Modify client configuration
- **Delete**: Delete client configuration
- **Batch Delete**: Delete multiple selected clients

**Top Toolbar:**
- **Template Repo Link**: Jump to GitHub template repository
  - URL: https://github.com/perfect-panel/subscription-template
  - Provides subscription template examples and documentation
- **Add**: Create new client configuration

## Client Form

A sidebar form that opens when clicking "Add" or "Edit", divided into three tabs.

### Basic Info

**Icon**
- Type: URL input + Upload button
- Format: Image URL or Base64 encoding
- Example: `https://example.com/icon.png`
- Function: Supports direct image upload, auto-converts to Base64

**Name** - Required
- Type: Text input
- Function: Client display name
- Example: `Clash for Windows`, `V2rayN`

**User-Agent** - Required
- Type: Text input
- Function: Client identifier for distinguishing different clients
- Example: `Clash`, `V2rayN`, `ClashX`
- Important: Must match the actual User-Agent sent by the client

**Description** - Optional
- Type: Multi-line text
- Function: Detailed client description
- Content: Client features, usage instructions, etc.

### Templates

**Output Format** - Required
- Type: Dropdown selection
- Options:
  - **Base64**: Traditional subscription format, suitable for most clients
  - **YAML**: Clash series client configuration format
  - **JSON**: JSON format configuration for clients supporting JSON
  - **CONF**: Configuration file format, like Shadowrocket
  - **Plain Text**: Plain text format

**Scheme** - Optional
- Type: Text input
- Function: Custom URL Scheme
- Example: `clash://`, `vmess://`
- Purpose: One-click subscription import

**Template** - Required
- Type: Go Template editor
- Function: Write subscription content using Go template syntax
- Supports: Syntax highlighting, code completion
- Variables:
  - <code v-pre>{{.SiteName}}</code>: Site name
  - <code v-pre>{{.SubscribeName}}</code>: Subscription name
  - <code v-pre>{{.Proxies}}</code>: Node array
  - <code v-pre>{{.UserInfo}}</code>: User information

**Template Variable Reference**

For detailed template variable reference, see: [Template Variable Reference](./subscribe-variables.md)

UserInfo Fields:

- `Password` - User password
- `ExpiredAt` - Expiration time
- `Download` - Downloaded traffic
- `Upload` - Uploaded traffic
- `Traffic` - Total traffic
- `SubscribeURL` - Subscription link

### Downloads

Configure client download URLs for multiple platforms:

- **Windows**: Windows platform download link
- **macOS**: macOS platform download link
- **Linux**: Linux platform download link
- **iOS**: iOS platform download link
- **Android**: Android platform download link
- **HarmonyOS**: HarmonyOS download link

Each platform is optional. When filled, corresponding platform badges will be displayed in the client list.

## Use Cases

### Scenario 1: Configure Clash Client

1. Click "Add"
2. Basic Info:
   - Name: `Clash for Windows`
   - User-Agent: `Clash`
   - Icon: Upload Clash icon
3. Templates:
   - Output Format: Select `YAML`
   - Template: Write Clash YAML configuration template
4. Downloads:
   - Windows: `https://github.com/Fndroid/clash_for_windows_pkg/releases`
   - macOS: `https://github.com/yichengchen/clashX/releases`
5. Click "Confirm"

### Scenario 2: Configure Traditional Base64 Subscription

1. Click "Add"
2. Basic Info:
   - Name: `Universal`
   - User-Agent: `*`
3. Templates:
   - Output Format: Select `Base64`
   - Template: Write standard vmess/vless URI list
4. Set as default client
5. Click "Confirm"

### Scenario 3: Restrict Subscription Access

1. Open "Subscription Configuration"
2. Enable "User-Agent Restriction"
3. Add to "User-Agent Whitelist":
   ```
   Clash
   V2rayN
   ClashX
   Quantumult
   ```
4. Save configuration
5. Only whitelisted clients can access subscriptions

### Scenario 4: Use Custom Domain

1. Open "Subscription Configuration"
2. Add to "Subscription Domain":
   ```
   sub.example.com
   cdn.example.com
   ```
3. Configure "Subscription Path": `/api/sub`
4. Save configuration
5. Users can access subscriptions via `https://sub.example.com/api/sub/{token}`

## Template Writing Guide

### Base64 Format Example
```go
{{range .Proxies}}{{.Type}}://{{.UUID}}@{{.Server}}:{{.Port}}?security={{.Security}}&sni={{.SNI}}#{{.Name}}
{{end}}
```

### Clash YAML Format Example
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

### Conditional Logic Example
```go
{{range .Proxies}}
{{if eq .Type "vless"}}
vless://{{.UUID}}@{{.Server}}:{{.Port}}
{{else if eq .Type "vmess"}}
vmess://{{.UUID}}@{{.Server}}:{{.Port}}
{{end}}
{{end}}
```

## Important Notes

1. **User-Agent Matching**: Must exactly match the User-Agent sent by the client, otherwise cannot be correctly identified
2. **Template Syntax**: Uses Go Template syntax, syntax errors will cause subscription generation failure
3. **Output Format**: Ensure template output matches selected format, e.g., YAML format requires correct indentation
4. **Default Client**: Only one default client at a time, setting new default will cancel the old one
5. **Domain Configuration**: Custom domains need to be correctly configured in DNS and web server
6. **Path Changes**: After changing subscription path, system restart recommended for best performance
7. **Preview Function**: Use preview to test if template generates correctly
8. **Template Repository**: Refer to GitHub template repository for more examples and best practices

</div>
