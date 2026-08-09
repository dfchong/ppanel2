<div v-pre>

# Subscribe Traffic Log

View daily traffic usage statistics for user subscriptions with detailed traffic consumption breakdown.

## Table Column Description

### User
User consuming traffic (clickable for details).

### Subscribe
Associated subscription ID (clickable for details, hover for card).

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
- View detailed traffic for that date and subscription
- Grouped by nodes
- Aggregated by servers

## Filter Functions

### Date Filter
Select date to view traffic records, defaults to today.

### User ID Filter
Input user ID to view that user's traffic records.

### Subscribe ID Filter
Input subscription ID to view that subscription's traffic records.

## Usage Scenarios

### Scenario 1: View Today's Traffic

1. Shows today's traffic records by default
2. View total traffic consumption
3. Identify high-traffic users
4. Analyze traffic trends

### Scenario 2: Track User Traffic

**View User Usage**:
1. Filter by user ID
2. View all subscription traffic
3. Analyze usage habits
4. Predict traffic needs

### Scenario 3: Investigate Traffic Anomalies

**Check Abnormal Consumption**:
1. Browse traffic records
2. Focus on unusually high traffic
3. Click "Detail" for breakdown
4. Analyze traffic distribution by node
5. Check for abuse

### Scenario 4: Traffic Statistics Analysis

**Generate Reports**:
1. Select date range
2. Export traffic data
3. Analyze traffic peak times
4. Optimize node resource allocation

## Traffic Detail Page

After clicking "Detail" shows:

### Node Traffic Breakdown
- Traffic consumption per node
- Upload/download separately counted
- Connection duration records

### Server Traffic Statistics
- Total traffic per server
- Traffic proportion analysis
- Load situation assessment

## Traffic Monitoring

### Abnormal Patterns
Watch for:
- Sudden daily traffic surge
- Traffic far exceeding plan limit
- High traffic in unusual time periods
- Single node excessive traffic

### Handling Measures
When anomalies detected:
1. View traffic details
2. Confirm if abuse
3. Throttle or suspend subscription
4. Notify user for verification

## Important Notes

1. **Log Retention**: Retention time per system config
2. **Unit Conversion**: Auto-converts to readable units
3. **Subscription Association**: Can cross-query user's multiple subscriptions
4. **Detail Jump**: Click detail for node-level breakdown
5. **Real-time**: Traffic data may have delay
6. **Total Accuracy**: Total includes upload and download
7. **Regular Analysis**: Recommended weekly traffic trend analysis

</div>
