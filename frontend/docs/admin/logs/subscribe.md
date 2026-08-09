<div v-pre>

# Subscribe Log

View user subscription link request records including IP, device, and time information.

## Table Column Description

### User
User requesting subscription (clickable for details).

### Subscribe ID
Requested subscription ID (clickable for subscription details, hover for card).

### IP Address
Request IP address (clickable to view IP info).

### User Agent
Client device and system information:
- Hover to show full content
- Truncated to avoid excessive length

### Time
Request time.

## Filter Functions

### Date Filter
Select date to view subscription records, defaults to today.

### User ID Filter
Input user ID to view that user's subscription requests.

### Subscribe ID Filter
Input subscription ID to view that subscription's request records.

## Usage Scenarios

### Scenario 1: View Today's Requests

1. Shows today's subscription records by default
2. Check request frequency
3. Analyze active subscriptions
4. Identify abnormal requests

### Scenario 2: Track User Requests

**View User Activity**:
1. Filter by user ID
2. View all subscription requests
3. Analyze usage frequency
4. Verify device types

### Scenario 3: Investigate Subscription Anomalies

**Check Abnormal Requests**:
1. View subscription logs
2. Focus on IP address changes
3. Check User Agent
4. Identify suspicious devices
5. Ban subscription if necessary

### Scenario 4: Analyze Client Distribution

**Calculate Client Types**:
1. View User Agent information
2. Count client distribution
3. Understand user habits
4. Optimize client support

## Subscription Request Monitoring

### Normal Pattern
- Periodic subscription link requests
- Update node information
- Sync configuration changes

### Abnormal Patterns
Watch for:
- High-frequency requests in short time
- Multiple subscriptions from same IP
- Access from unusual countries/regions
- Unfamiliar client types

## Security Protection

### Detection Measures
- Request rate limiting
- IP whitelist/blacklist
- Subscription token verification
- Device count limit

### Handling Measures
When abuse detected:
1. Limit request rate
2. Temporarily ban IP
3. Reset subscription token
4. Notify user for confirmation

## User Agent Analysis

### Common Clients
- **Clash**: Clash for Windows/Mac/Android
- **Shadowrocket**: iOS client
- **V2rayN**: Windows client
- **Quantumult**: iOS client
- **Surfboard**: Android client

### Identification Info
From User Agent:
- Client name and version
- OS type
- Device model
- System version

## Important Notes

1. **Log Retention**: Retention per system config
2. **IP Tracking**: Can view IP geolocation
3. **Device Recognition**: User Agent contains client info
4. **Request Frequency**: Normal clients request periodically
5. **Abnormal Monitoring**: Watch for high-frequency and remote requests
6. **Privacy Protection**: IP and device info sensitive
7. **Regular Analysis**: Weekly subscription request trend analysis
8. **Prevent Leakage**: Subscription links should not be publicly shared

</div>
