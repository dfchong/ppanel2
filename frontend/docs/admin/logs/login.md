<div v-pre>

# Login Log

View user login records including login methods, IP addresses, and device information.

## Table Column Description

### User
Logged in user, displays:
- Login method Badge (Email/Phone/Google etc.)
- User ID (clickable for details)

### IP Address
Login IP address (clickable to view IP info).

### User Agent
User device and browser information:
- Hover to show full content
- Truncated to avoid excessive length

### Success Status
Whether login succeeded:
- **Success** (Green Badge)
- **Failed** (Red Badge)

### Time
Login time.

## Filter Functions

### Date Filter
Select date to view login records, defaults to today.

### User ID Filter
Input user ID to view that user's login records.

## Usage Scenarios

### Scenario 1: View Today's Logins

1. Shows today's login records by default
2. Check login frequency
3. Analyze active users

### Scenario 2: Investigate Abnormal Logins

**Check Failed Logins**:
1. Filter failed login records
2. View IP addresses
3. Analyze failure reasons
4. Ban IPs if necessary

**Check Remote Logins**:
1. View user login IPs
2. Click IP to view geolocation
3. Compare with historical locations
4. Notify user if anomalies found

### Scenario 3: Track User Logins

**View Specific User**:
1. Filter by user ID
2. View login history
3. Analyze login devices
4. Verify account security

## Security Monitoring

### Abnormal Patterns
Watch for:
- High volume of failed logins in short time
- Multiple accounts from same IP
- Logins from unusual countries/regions
- Logins from rare device types

### Protection Measures
When anomalies detected:
1. Temporarily ban IP
2. Force user password reset
3. Send security notification
4. Enable two-factor authentication

## Important Notes

1. **Log Retention**: Auto-cleaned per system config
2. **IP Query**: Click IP to view geolocation
3. **User Agent**: Contains OS and browser info
4. **Privacy Protection**: Sensitive info only for admins
5. **Failed Records**: Focus on failed login anomalies
6. **Regular Checks**: Recommended daily login review

</div>
