<div v-pre>

# Email Log

View all email records sent by the system including sending status and content.

## Table Column Description

### Platform
Email sending platform (displayed as Badge):
- SMTP
- SendGrid
- Mailgun
- AWS SES
- Other email providers

### To
Recipient email address.

### Subject
Email subject.

### Content
Email content (displayed as JSON):
- Plain text content
- HTML content
- Template variables
- Max width 480px

### Status
Email sending status (displayed as Badge):
- **Sent** (Green) - Successfully sent
- **Failed** (Red) - Send failed
- **Unknown** (Gray) - Unknown status

### Time
Email sending time.

## Filter Functions

### Keyword Search
Search recipient address or email subject.

### Date Filter
Select date to view email records, defaults to today.

## Usage Scenarios

### Scenario 1: View Today's Emails

1. Shows today's email records by default
2. Check sending quantity
3. Check sending status
4. Calculate success rate

### Scenario 2: Investigate Send Failures

**Check Failed Emails**:
1. Filter "Failed" status
2. View recipient addresses
3. Check email content
4. Analyze failure reasons
5. Resend or fix configuration

### Scenario 3: Verify Email Content

**Check Email Templates**:
1. Search specific subject
2. View email content
3. Verify variable replacement
4. Confirm format correctness

### Scenario 4: Track User Emails

**View User Received Emails**:
1. Search user email
2. View all emails
3. Confirm delivery
4. Verify email types

## Email Types

### System Emails
- Registration verification
- Password reset
- Login verification code
- Account notifications

### Marketing Emails
- Promotional emails
- Activity notifications
- Offer information
- Product updates

### Transactional Emails
- Order confirmation
- Payment success
- Invoice notification
- Expiration reminder

## Sending Monitoring

### Success Rate Monitoring
Watch metrics:
- Daily total sent
- Send success rate
- Failure rate trends
- Platform-specific performance

### Exception Handling
When issues found:
1. Check SMTP configuration
2. Verify email provider status
3. Check rate limits
4. Review error logs

## Email Content Description

### JSON Format
Content field contains:
```json
{
  "text": "Plain text content",
  "html": "<p>HTML content</p>",
  "variables": {
    "username": "Username",
    "code": "Verification code"
  }
}
```

### Variable Replacement
- {{username}}: Username
- {{code}}: Verification code
- {{link}}: Link address
- {{expire}}: Expiration time

## Important Notes

1. **Log Retention**: Retention per system config
2. **Content Truncation**: Long content may be truncated
3. **JSON Display**: Content shown as JSON format
4. **Platform Recognition**: Identify sending channel by platform field
5. **Status Monitoring**: Watch for failed send records
6. **Privacy Protection**: Email content may contain sensitive info
7. **Regular Checks**: Daily sending status review
8. **Quota Management**: Mind email provider quota limits

</div>
