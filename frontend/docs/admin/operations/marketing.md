<div v-pre>

# Marketing Management

Provides two major marketing functions: email marketing and quota services for batch user outreach and benefit distribution.

## Function Modules

### Email Marketing

Contains two functions:

#### 1. Email Broadcast

Send marketing emails to users in bulk.

**Form Fields**:

- **Email Subject** (Required) - Email title
- **Email Content** (Required) - Supports HTML editor for rich text emails
- **Send Scope** - Select target user group:
  - All users
  - Users with subscriptions
  - Users without subscriptions
  - Filter by registration time
- **Registration Time Range** (Optional) - Filter users registered in specific period
- **Additional Emails** (Optional) - Manually input extra email addresses, one per line
- **Scheduled Send** (Optional) - Set future send time
- **Send Interval** (Optional) - Seconds between each email (minimum 0.1s)
- **Daily Limit** (Optional) - Maximum sends per day (minimum 1)

**Recipient Statistics**:
Form displays in real-time:
- System users count
- Additional emails count
- Total recipients count

#### 2. Email Task Manager

View and manage email sending tasks.

**Task List Shows**:
- Task ID
- Subject
- Send status
- Sent count
- Total count
- Creation time

**Task Operations**:
- View details
- Pause/Resume
- Delete task

### Quota Service

Batch gift traffic, days, or balance to users.

#### 1. Quota Broadcast

Batch gift benefits to subscribed users.

**Form Fields**:

- **Select Packages** (Required) - Multi-select target product plans
- **Subscription Status** - Filter condition:
  - Active subscriptions only
  - Include expired subscriptions
- **Subscription Time Range** (Optional) - Filter users subscribed in specific period
- **Reset Traffic** - Switch, whether to reset user traffic when gifting
- **Gift Type** (Required) - Radio:
  - Traffic (GB)
  - Days
  - Balance
- **Gift Value** (Required) - Specific gift amount

**Recipient Statistics**:
Form displays qualifying user count in real-time.

#### 2. Quota Task Manager

View and manage quota distribution tasks.

**Task List Shows**:
- Task ID
- Package names
- Gift type and amount
- Processing status
- Processed/Total
- Creation time

**Task Operations**:
- View details
- Delete task

## Usage Scenarios

### Scenario 1: New User Welcome Email

**Email Broadcast Config**:
- Subject: Welcome!
- Content: Design welcome email (HTML)
- Scope: All users
- Registration: Last 7 days
- Interval: 1 second
- Daily Limit: 1000

### Scenario 2: Promotion Notification

**Email Broadcast Config**:
- Subject: Limited Time! 20% Off Annual Plans
- Content: Activity details (HTML)
- Scope: Users with subscriptions
- Scheduled: 1 hour before activity

### Scenario 3: Gift Traffic Benefit

**Quota Broadcast Config**:
- Packages: Standard Monthly
- Status: Active only
- Subscription Time: Past 30 days
- Reset Traffic: No
- Gift Type: Traffic
- Gift Value: 10 GB

### Scenario 4: Gift Membership Duration

**Quota Broadcast Config**:
- Packages: All packages
- Status: Active only
- Reset Traffic: No
- Gift Type: Days
- Gift Value: 7

### Scenario 5: Balance Cashback

**Quota Broadcast Config**:
- Packages: Premium Plan
- Status: Active only
- Subscription Time: Past 7 days
- Gift Type: Balance
- Gift Value: $10

## Important Notes

1. **Email Sending**: Watch interval and limits to avoid spam classification
2. **HTML Content**: Emails support rich text for beautiful marketing content
3. **Scheduled Tasks**: Can set future time for automatic sending
4. **Real-time Stats**: Recipient count calculated in real-time, preview before submit
5. **Task Management**: Can view task execution progress and status
6. **Quota Gifting**: Quotas distributed immediately, cannot be revoked
7. **Traffic Reset**: Checking will reset user's current traffic
8. **Package Filtering**: Can precisely select target user groups

</div>
