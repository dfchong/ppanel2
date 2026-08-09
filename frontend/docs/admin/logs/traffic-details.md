<div v-pre>

# Traffic Details Log

View detailed traffic consumption records with multi-dimensional filtering by server, user, and subscription.

## Table Column Description

### Server
Server generating traffic:
- Server name
- Server ID

### User
User consuming traffic (clickable for details).

### Subscribe
Associated subscription ID (clickable for subscription details, hover for card).

### Upload
Upload traffic, auto-converts units (B/KB/MB/GB/TB).

### Download
Download traffic, auto-converts units.

### Time
Traffic generation time.

## Filter Functions

### Date Filter
Select date to view traffic details, defaults to today.

### Server ID Filter
Input server ID to view that server's traffic details.

### User ID Filter
Input user ID to view that user's traffic details.

### Subscribe ID Filter
Input subscription ID to view that subscription's traffic details.

## Usage Scenarios

### Scenario 1: View Server Traffic Breakdown

Enter from server traffic log by clicking "Detail":
1. Auto-fills date and server ID
2. View all user traffic on that server
3. Sort by user
4. Identify high-traffic users

### Scenario 2: View User Traffic Details

Enter from subscribe traffic log by clicking "Detail":
1. Auto-fills date, user ID, and subscription ID
2. View that user's subscription traffic
3. View distribution by server
4. Analyze usage habits

### Scenario 3: Investigate Traffic Anomalies

**Detailed Investigation**:
1. Select anomaly date
2. Input relevant filter conditions
3. View detailed traffic records
4. Sort by time for analysis
5. Identify abnormal traffic sources

### Scenario 4: Traffic Statistics Analysis

**Multi-dimensional Analysis**:
1. Select time range
2. Combine different filter conditions
3. Export detailed data
4. Generate traffic reports
5. Develop optimization strategies

## Data Association

### Jump from Server Traffic
- Brings server ID and date
- View all traffic on that server
- Can further filter by user

### Jump from Subscribe Traffic
- Brings user ID, subscription ID, and date
- View all traffic for that subscription
- Can view different servers

## Traffic Analysis

### Time Distribution
- View traffic time distribution
- Identify usage peak times
- Analyze user active hours
- Optimize server scheduling

### Server Distribution
- Count traffic proportion per server
- Analyze load distribution
- Identify popular servers
- Optimize load balancing

### User Distribution
- Identify high-traffic users
- Analyze user usage habits
- Check for abuse
- Optimize plan configuration

## Traffic Monitoring

### Normal Pattern
- Evenly distributed traffic
- Time regularity
- Matches user count
- No abnormal peaks

### Abnormal Patterns
Watch for:
- Abnormally large single traffic
- Traffic in unusual time periods
- High-frequency requests from single user
- Unreasonable traffic distribution

## Investigation Steps

### Discover Anomaly
1. Find anomaly from statistics log
2. Click detail to enter
3. View detailed records

### Locate Problem
1. Sort by time
2. Identify abnormal records
3. View user information
4. Confirm subscription status

### Handling Measures
1. Verify if normal usage
2. Check for abuse
3. Throttle or suspend subscription
4. Notify user for confirmation

## Data Export

### Export Purpose
- Generate traffic reports
- Financial reconciliation
- User analysis
- Capacity planning

### Export Content
- All column data
- Filtered data
- CSV or Excel format
- Supports batch export

## Important Notes

1. **Log Retention**: Retention per system config
2. **Unit Conversion**: Auto-converts to readable units
3. **Multi-filter**: Supports multiple condition combinations
4. **Jump with Params**: Jumps from stats logs auto-fill parameters
5. **Real-time**: Traffic data may have delay
6. **Detail Level**: Most detailed traffic records
7. **Performance**: Consider filtering with large data volumes
8. **Regular Cleanup**: Detail logs consume more storage
9. **Export Limits**: Single export may have quantity limits
10. **Privacy Protection**: Detailed records contain user behavior info

</div>
