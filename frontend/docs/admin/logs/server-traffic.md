<div v-pre>

# Server Traffic Log

View daily traffic statistics for each server with detailed traffic consumption breakdown.

## Table Column Description

### Server
Server information display:
- Server ID (displayed as Badge)
- Server name

### Upload
Daily upload traffic, auto-converts units (B/KB/MB/GB/TB).

### Download
Daily download traffic, auto-converts units.

### Total
Daily total traffic (upload + download).

### Date
Traffic statistics date.

## Table Operations

### View Detail
Click "Detail" button to jump to detailed traffic records page:
- View detailed traffic for that date and server
- Grouped by users
- Aggregated by subscriptions

## Filter Functions

### Date Filter
Select date to view traffic records, defaults to today.

### Server ID Filter
Input server ID to view that server's traffic records.

## Usage Scenarios

### Scenario 1: View Today's Traffic

1. Shows today's traffic records by default
2. View traffic consumption per server
3. Identify high-traffic servers
4. Analyze traffic distribution

### Scenario 2: Track Server Load

**View Server Usage**:
1. Filter by server ID
2. View historical traffic records
3. Analyze traffic trends
4. Evaluate server load

### Scenario 3: Investigate Traffic Anomalies

**Check Abnormal Consumption**:
1. Browse traffic records
2. Focus on abnormally high-traffic servers
3. Click "Detail" for breakdown
4. Analyze traffic distribution by user
5. Check for abuse

### Scenario 4: Traffic Statistics Analysis

**Generate Reports**:
1. Select date range
2. Export traffic data
3. Analyze traffic peak times
4. Optimize server resource allocation
5. Plan capacity expansion

## Traffic Detail Page

After clicking "Detail" shows:

### User Traffic Breakdown
- Traffic consumption per user
- Subscription traffic statistics
- Connection duration records

### Node Traffic Statistics
- Total traffic per node
- Traffic proportion analysis
- User distribution

## Traffic Monitoring

### Normal Pattern
- Evenly distributed traffic
- Matches user count
- Regular peak/valley patterns

### Abnormal Patterns
Watch for:
- Sudden traffic surge on single server
- Severely uneven traffic distribution
- High traffic in unusual time periods
- Excessive traffic from single user

## Server Management

### Load Balancing
Based on traffic data:
- Identify high-load servers
- Distribute users to other servers
- Adjust server weights
- Optimize node configuration

### Capacity Planning
Based on traffic trends:
- Predict traffic growth
- Plan server expansion
- Optimize bandwidth configuration
- Control operating costs

## Data Analysis

### Traffic Statistics
Daily/monthly stats:
- Total traffic consumption
- Server proportion
- Traffic growth trends
- Bandwidth utilization rate

### Cost Analysis
- Traffic cost calculation
- Server ROI analysis
- Optimization opportunity identification
- Cost control recommendations

## Important Notes

1. **Log Retention**: Retention per system config
2. **Unit Conversion**: Auto-converts to readable units
3. **Server Association**: Can view single server history
4. **Detail Jump**: Click detail for user-level breakdown
5. **Real-time**: Traffic data may have delay
6. **Total Accuracy**: Total includes upload and download
7. **Regular Analysis**: Recommended weekly traffic trend analysis
8. **Load Monitoring**: Watch server load situation
9. **Expansion Alert**: Expand when traffic nears limit
10. **Cost Optimization**: Optimize config based on traffic data

</div>
