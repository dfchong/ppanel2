<div v-pre>

# Balance Log

View user balance change records including recharges, consumption, rewards, and all balance operations.

## Table Column Description

### User
User with balance change (clickable for details).

### Amount
Balance change amount:
- Positive for increase
- Negative for decrease

### Order No.
Associated order number (clickable for order details).

### Balance
User balance after change.

### Type
Balance change type (displayed as Badge):

**Traffic Reset (23x)**:
- Auto Reset (231)
- Advance Reset (232)
- Paid Reset (233)

**Recharge/Withdrawal (32x)**:
- Recharge (321)
- Withdraw (322)
- Payment (323)
- Refund (324)
- Reward (325)
- Admin Adjust (326)

**Purchase (33x)**:
- Purchase (331)
- Renewal (332)
- Refund (333)
- Withdraw (334)
- Admin Adjust (335)

**Adjustment (34x)**:
- Increase (341)
- Reduce (342)

### Time
Balance change time.

## Filter Functions

### Date Filter
Select date to view balance records, defaults to today.

### User ID Filter
Input user ID to view that user's balance changes.

## Usage Scenarios

### Scenario 1: View Today's Recharges

1. Shows today's balance records by default
2. Filter by "Recharge" type
3. Calculate total recharge amount
4. Analyze recharging users

### Scenario 2: Track User Balance

**View User Consumption**:
1. Filter by user ID
2. View all balance changes
3. Analyze spending habits
4. Verify billing accuracy

### Scenario 3: Investigate Abnormal Transactions

**Check Large Amounts**:
1. Browse balance records
2. Focus on large recharges/expenses
3. Click order number for details
4. Verify transaction legitimacy

### Scenario 4: Admin Balance Adjustment

**Verify After Manual Adjustment**:
1. Filter "Admin Adjust" type
2. View adjustment records
3. Verify adjustment correctness
4. Notify user (if needed)

## Balance Type Description

### Recharge Related
- **Recharge**: User recharges via payment channel
- **Reward**: Referral reward, event reward
- **Refund**: Order refund to balance

### Consumption Related
- **Purchase**: Buy new plan
- **Renewal**: Renew existing plan
- **Payment**: Other payment operations

### Adjustment Related
- **Admin Adjust**: Manually increase or decrease balance
- **Withdraw**: User requests withdrawal (deducts balance)

## Financial Reconciliation

### Daily Reconciliation
Check daily:
1. Total recharge matches payment platform
2. Total consumption matches order total
3. No abnormal large changes
4. Refund records complete

### Monthly Reconciliation
Monthly summary:
1. Total recharge amount
2. Total consumption amount
3. Total balance change
4. Transaction fee expenses

## Important Notes

1. **Log Retention**: Retention time per system config
2. **Amount Sign**: Pay attention to positive/negative meaning
3. **Order Association**: Can trace source with order number
4. **Type Recognition**: Quickly identify operations by type code
5. **Balance Snapshot**: Records balance after change
6. **Admin Operations**: Admin adjustments are recorded
7. **Regular Reconciliation**: Recommended daily financial verification

</div>
