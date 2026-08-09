<div v-pre>

# Reset Subscribe Log

View subscription traffic reset records including reset types and associated orders.

## Table Column Description

### User
User owning the subscription (clickable for details).

### Subscribe ID
Reset subscription ID (clickable for subscription details, hover for card).

### Type
Reset type (displayed as Badge):
- **Auto Reset** - Automatically reset by cycle
- **Advance Reset** - User manually resets in advance
- **Paid Reset** - Purchase traffic reset service

### Order No.
Associated order number (shown for paid resets, clickable for order details).

### Time
Reset time.

## Filter Functions

### Date Filter
Select date to view reset records, defaults to today.

### Subscribe ID Filter
Input subscription ID to view that subscription's reset records.

## Usage Scenarios

### Scenario 1: View Today's Resets

1. Shows today's reset records by default
2. Count reset quantity
3. Analyze reset type distribution
4. Identify high-frequency reset users

### Scenario 2: Track Subscription Resets

**View Subscription History**:
1. Filter by subscription ID
2. View all reset records
3. Analyze reset frequency
4. Verify resets are normal

### Scenario 3: Analyze Paid Resets

**Calculate Paid Data**:
1. Filter "Paid Reset" type
2. Count paid reset quantity
3. Calculate paid reset revenue
4. Analyze user demand

### Scenario 4: Investigate Abnormal Resets

**Check Suspicious Resets**:
1. View reset logs
2. Focus on high-frequency advance resets
3. Identify abnormal reset behavior
4. Verify order associations

## Reset Type Description

### Auto Reset
- Automatically resets by subscription cycle
- Monthly/weekly/daily reset
- Executed by system scheduled task
- Most common reset method

### Advance Reset
- User manually resets in advance
- Consumes reset count
- Or purchase reset with payment
- Suitable for traffic exhaustion

### Paid Reset
- User purchases traffic reset service
- Generates order record
- Resets immediately after payment
- Has associated order number

## Reset Rules

### Auto Reset Time
- **Monthly Reset**: 1st of month at 00:00
- **Weekly Reset**: Monday at 00:00
- **Daily Reset**: Every day at 00:00

### Reset Count Limit
- Plan includes reset count
- Exceeding count requires payment
- Count resets each cycle

### Paid Reset Pricing
- Based on plan traffic config
- Generally 20-30% of plan price
- Configurable in product management

## Traffic Management

### Reset Strategy
- Set reasonable reset cycle
- Configure reset count limit
- Price paid reset service
- Notify users of reset rules

### User Reminders
- Traffic near exhaustion reminder
- Reset time reminder
- Paid reset recommendation
- Upgrade plan suggestion

## Data Statistics

### Reset Analysis
Daily/monthly stats:
- Auto reset count
- Advance reset count
- Paid reset count
- Paid reset revenue

### User Behavior
- High-frequency reset users
- Paid reset conversion rate
- Traffic usage after reset
- Upgrade plan conversion

## Important Notes

1. **Log Retention**: Retention per system config
2. **Subscription Association**: Each record linked to subscription ID
3. **Type Recognition**: Distinguish reset method by type
4. **Order Association**: Paid resets have order number
5. **Time Accuracy**: Records precise reset time
6. **Count Management**: Track user reset counts
7. **Regular Analysis**: Weekly reset data analysis
8. **Strategy Optimization**: Optimize reset rules based on data

</div>
