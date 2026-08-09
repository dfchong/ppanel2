# User Management

The User Management module manages all user accounts in the system, which is the foundation of system operations.

## Overview

### User List

View and manage all users:

- **User Info**: Username, email, phone
- **User Group**: VIP/Regular/Trial, etc.
- **Account Status**: Active/Disabled/Expired
- **Balance**: Account balance
- **Traffic**: Used/Total traffic
- **Validity**: Subscription expiry date
- **Registration**: Account registration date
- **Last Login**: Last login time

### User Filtering

Quickly find users:

- **By Status**: Active/Disabled/Expired
- **By Group**: VIP/Regular users
- **By Registration**: Date range filter
- **By Traffic**: Filter by traffic usage
- **By Device**: Online/Offline users
- **Search**: Username/Email/Phone search

### Add User

Manually create new user account:

#### Basic Info

- **Username**: Login username (unique)
- **Email**: User email address
- **Phone**: Contact phone (optional)
- **Password**: Initial password

#### Subscription Info

- **User Group**: Select user group
- **Traffic Quota**: Set traffic allowance
- **Validity**: Set expiry date
- **Speed Limit**: Set rate cap
- **Device Limit**: Concurrent device count

#### Account Settings

- **Balance**: Initial account balance
- **Points**: Initial points
- **Referral Code**: Custom invite code
- **Notes**: User notes

### Edit User

Modify user info and config:

- **Update Basic Info**: Change email, phone, etc.
- **Adjust Subscription**: Modify traffic, validity
- **Balance Operations**: Top-up or deduct balance
- **Reset Password**: Reset password for user
- **Change Group**: Upgrade or downgrade group

### Delete User

Delete user account:

- **Soft Delete**: Mark deleted but keep data
- **Hard Delete**: Permanently delete user and data
- **Batch Delete**: Delete multiple users

::: warning Warning
Deleting a user will clear all subscriptions and usage records. Proceed with caution.
:::

## User Operations

### Disable/Enable

Control user account status:

- **Disable Account**: Suspend service access
- **Enable Account**: Restore normal usage
- **Disable Reason**: Record reason
- **Auto Unban**: Set auto-unban time

### Traffic Operations

Manage user traffic:

- **Add Traffic**: Add traffic for user
- **Deduct Traffic**: Deduct user traffic
- **Reset Traffic**: Reset to initial value
- **Traffic Log**: View traffic change history

### Duration Operations

Manage subscription duration:

- **Extend Time**: Extend validity period
- **Shorten Time**: Reduce duration
- **Set Expiry**: Set specific expiry date
- **Lifetime**: Set to never expire

### Balance Operations

Manage user balance:

- **Top-up**: Recharge user account
- **Deduct**: Deduct from account
- **Transfer**: Transfer between users
- **Balance Log**: View balance changes

## User Details

### Basic Info

View complete user information:

- Account basic profile
- Subscription status and quota
- Balance and points
- Referral information

### Subscription Info

View user subscription details:

- Current subscription package
- Traffic usage
- Remaining validity
- Node access permissions

### Usage Statistics

Analyze user usage data:

- **Traffic Stats**: Daily/Weekly/Monthly traffic
- **Online Duration**: Usage time statistics
- **Node Preference**: Common node analysis
- **Device Stats**: Device count statistics

### Order Records

View user purchase history:

- Historical order list
- Order amount statistics
- Purchase frequency analysis
- Renewal status

### Login Records

View user login history:

- Login time
- Login IP
- Login device
- Login location

### Online Devices

View user online devices:

- Device type and OS
- Connected node
- Online duration
- Force offline function

## User Grouping

### Group Management

Create and manage user groups:

- **Group Name**: User group display name
- **Permissions**: Node access permissions
- **Traffic Quota**: Default group traffic
- **Speed Limit**: Group rate cap
- **Other Limits**: Devices, concurrency, etc.

### Batch Grouping

Batch set user groups:

- Select multiple users
- Specify target group
- Batch update groups
- Keep or reset quotas

## User Search

### Advanced Search

Search users with multiple conditions:

- **Combined Conditions**: Multiple criteria
- **Range Search**: Traffic, balance ranges
- **Time Range**: Registration, expiry
- **Custom Fields**: Notes and other fields

### Save Search

Save frequently used search criteria:

- Quick apply search
- Manage saved searches
- Share search criteria

## User Export

Export user data:

### Export Options

- **Export Format**: Excel/CSV
- **Export Fields**: Custom export fields
- **Data Range**: All or filtered results
- **Data Masking**: Handle sensitive info

### Batch Import

Batch import users:

- Download import template
- Fill user data
- Upload Excel file
- Validate and import

## User Notification

### Send Notification

Send messages to users:

- **Internal Message**: System notifications
- **Email**: Send email notifications
- **SMS**: Send SMS notifications
- **Batch Notify**: Send messages in batch

### Notification Templates

Manage notification templates:

- Create message templates
- Use variable substitution
- Multi-language templates
- Scheduled sending

## User Analysis

### User Profile

Analyze user characteristics:

- **Basic Attributes**: Age, region distribution
- **Behavioral**: Usage habits, activity
- **Consumption**: AOV, repurchase rate
- **Churn Risk**: Churn prediction

### User Value

Evaluate user value:

- **RFM Analysis**: Recency, Frequency, Monetary
- **Lifecycle**: User lifecycle stage
- **Contribution**: Revenue contribution ranking
- **Activity**: Usage activity level

## User Security

### Security Settings

Enhance account security:

- **Force 2FA**: Require two-factor auth
- **IP Whitelist**: Restrict login IPs
- **Device Management**: Manage authorized devices
- **Anomaly Detection**: Detect abnormal logins

### Risk Control

Prevent malicious users:

- **Behavior Monitoring**: Monitor abnormal behavior
- **Risk Scoring**: User risk level
- **Auto Ban**: Auto-disable on rule trigger
- **Blacklist**: Permanently block users

## Best Practices

- Regularly review user account status
- Process expired user renewals promptly
- Focus on high-value user needs
- Analyze churn user reasons
- Protect user privacy data
- Establish tiered user service

## Troubleshooting

### Cannot Login

Check:

1. Is account disabled
2. Is password correct
3. Are security restrictions triggered
4. Is system service normal

### Traffic Anomaly

Possible reasons:

1. Statistics service failure
2. Node reporting anomaly
3. User device issues
4. Malicious usage

### Batch Operation Failed

Check:

1. Number of users selected
2. Operation permissions
3. Is data format correct
4. Are system resources sufficient

## Next Steps

- [Ticket Management](/admin/users-support/tickets) - Handle user tickets
- [Order Management](/admin/commerce/orders) - View user orders
- [Login Logs](/admin/logs/login) - View login records
