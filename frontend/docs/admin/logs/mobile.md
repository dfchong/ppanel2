<div v-pre>

# SMS Log

View all SMS records sent by the system including sending status and content.

## Table Column Description

### Platform
SMS sending platform (displayed as Badge):
- Alibaba Cloud SMS
- Tencent Cloud SMS
- Twilio
- AWS SNS
- Other SMS providers

### To
Recipient phone number.

### Subject
SMS subject/type.

### Content
SMS content (displayed as JSON):
- SMS text
- Template variables
- Signature info
- Max width 480px

### Status
SMS sending status (displayed as Badge):
- **Sent** (Green) - Successfully sent
- **Failed** (Red) - Send failed
- **Unknown** (Gray) - Unknown status

### Time
SMS sending time.

## Filter Functions

### Keyword Search
Search recipient phone number or SMS subject.

### Date Filter
Select date to view SMS records, defaults to today.

## Usage Scenarios

### Scenario 1: View Today's SMS

1. Shows today's SMS records by default
2. Check sending quantity
3. Check sending status
4. Calculate success rate

### Scenario 2: Investigate Send Failures

**Check Failed SMS**:
1. Filter "Failed" status
2. View recipient numbers
3. Check SMS content
4. Analyze failure reasons (invalid number/insufficient balance/provider issues)
5. Resend or fix configuration

### Scenario 3: Verify SMS Content

**Check SMS Templates**:
1. Search specific subject
2. View SMS content
3. Verify variable replacement
4. Confirm signature correctness

### Scenario 4: Track User SMS

**View User Received SMS**:
1. Search user phone number
2. View all SMS
3. Confirm delivery
4. Verify SMS types

## SMS Types

### Verification Code SMS
- Registration verification code
- Login verification code
- Password reset code
- Phone binding code

### Notification SMS
- Order notifications
- Payment success
- Expiration reminders
- System announcements

### Marketing SMS
- Promotional SMS
- Activity notifications
- Offer information

## Sending Monitoring

### Success Rate Monitoring
Watch metrics:
- Daily total sent
- Send success rate
- Failure rate trends
- Platform-specific performance

### Exception Handling
When issues found:
1. Check SMS provider configuration
2. Verify API key validity
3. Check balance and quota
4. Review error logs
5. Contact provider technical support

## SMS Content Description

### JSON Format
Content field contains:
```json
{
  "template_id": "SMS_123456",
  "sign_name": "Brand Name",
  "params": {
    "code": "123456",
    "minutes": "5"
  }
}
```

### Template Variables
- <code v-pre>{{code}}</code>: Verification code
- <code v-pre>{{minutes}}</code>: Valid time
- <code v-pre>{{product}}</code>: Product name
- <code v-pre>{{amount}}</code>: Amount

## Cost Management

### Cost Statistics
- Daily SMS count
- Unit price calculation
- Monthly expenses
- Type distribution

### Cost Optimization
- Control verification code frequency
- Optimize SMS templates
- Choose cost-effective providers
- Avoid invalid sending

## Important Notes

1. **Log Retention**: Retention per system config
2. **Content Truncation**: Long content may be truncated
3. **JSON Display**: Content shown as JSON format
4. **Platform Recognition**: Identify sending channel by platform field
5. **Status Monitoring**: Watch for failed send records
6. **Number Privacy**: Phone numbers are sensitive info
7. **Regular Checks**: Daily sending status review
8. **Quota Management**: Mind SMS provider quota and balance
9. **Rate Limiting**: Prevent SMS flooding
10. **Compliance**: Follow SMS sending laws and regulations

</div>
