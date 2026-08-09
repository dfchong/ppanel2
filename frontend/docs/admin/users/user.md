<div v-pre>

# User Management

Manage all users in the system, including user information editing, subscription management, balance management, and more.

## Table Column Description

### Enable
Switch button to control whether user account is active. Disabled users cannot login.

### ID
User unique identifier ID.

### Username
Shows authentication method (EMAIL/GITHUB etc) and auth identifier (email/username). Checkmark after identifier indicates verified.

### Balance
User account balance.

### Gift Amount
Amount gifted by system.

### Commission
Commission earned through user referrals.

### Invite Code
User's exclusive invite code.

### Referer
Referrer who invited this user to register.

### Created At
User registration time.

## Table Operations

### Edit (Profile)
Opens user profile side drawer with three tabs:

**Basic Info**:
- Enable status
- Balance
- Gift amount
- Commission
- Invite code
- Referer ID

**Notify Settings**:
- Balance change notification
- Login notification
- Subscription notification
- Trade notification

**Auth Methods**:
- View and manage user login methods
- Email, GitHub, etc.

### Subscription
Opens subscription management side drawer to view and manage user subscriptions:
- Subscription list
- Subscription status
- Expiry time
- Traffic usage
- Subscription operations

### Delete
Deletes user (requires confirmation), cannot be recovered.

### More
Dropdown menu for quick navigation to:
- Order list
- Login logs
- Balance logs
- Commission logs
- Gift logs

## Filter Functions

### Subscription Filter
Select product plan to view users who purchased that plan.

### Keyword Search
Search users by email, username, etc.

### User ID Filter
Direct input of user ID for precise search.

### Subscription ID Filter
Input subscription ID to find corresponding user.

## Create User

Click "Create" button to open form:

**Required Fields**:
- Auth Type: EMAIL/GITHUB etc
- Auth Identifier: Email address or username
- Password: User login password

**Optional Fields**:
- Balance: Initial balance
- Referer ID: Bind referral relationship

## Usage Scenarios

### Scenario 1: Disable Violating User

1. Find target user
2. Turn off "Enable" switch
3. User immediately cannot login

### Scenario 2: Top Up User Balance

1. Click "Edit" button
2. Enter "Basic Info" tab
3. Modify balance amount
4. Save changes

### Scenario 3: View User Subscriptions

1. Click "Subscription" button
2. View all user subscriptions
3. Can operate subscriptions (renew, reset traffic, etc)

### Scenario 4: Track User Behavior

1. Click "More" button
2. Select corresponding log:
   - Login logs: View login records
   - Balance logs: View balance changes
   - Commission logs: View commission earnings
   - Gift logs: View system gifts

## Important Notes

1. **Enable Control**: Disabling user immediately kicks them out
2. **Balance Modification**: Direct balance modification, watch amount units
3. **Delete User**: Operation irreversible, confirm before deletion
4. **Subscription Management**: Can operate directly in user subscription page
5. **Log Tracking**: Quickly view various user logs through "More" menu
6. **Referral Relationship**: Can specify referrer when creating user
7. **Batch Operations**: Currently not supported
8. **Invite Code**: Each user has unique invite code

</div>
