# System Configuration

The System Configuration module manages global settings and parameters, controlling overall system behavior.

## Overview

### Basic Settings

System basic configuration:

- **Site Name**: System display name
- **Site Logo**: Website logo image
- **Site Icon**: Browser tab icon (Favicon)
- **Site Description**: Site intro and SEO description
- **Keywords**: SEO keywords
- **Contact Info**: Customer service contact

### System Info

View system runtime information:

- **System Version**: Current version number
- **Environment**: Server environment info
- **Uptime**: System uptime
- **Status**: Current running status
- **Database**: Database configuration
- **Cache**: Cache configuration and status

## Site Configuration

### Site Information

Configure site basics:

- **Site Name**: Display name on pages
- **Tagline**: Subtitle or slogan
- **Logo**: Upload website logo
- **Favicon**: Upload favicon
- **Copyright**: Footer copyright info
- **ICP Registration**: Site registration number

### SEO Settings

Search engine optimization:

- **Page Title**: Default page title
- **Keywords**: SEO keyword settings
- **Description**: Site description
- **robots.txt**: Search crawler rules
- **sitemap**: Sitemap configuration

### Contact Information

Set contact methods:

- **Support Email**: Customer service email
- **Phone**: Customer service phone
- **Live Chat**: Live chat link
- **Ticket System**: Ticket submission URL
- **Social Media**: Social media links

## Email Configuration

### SMTP Settings

Configure email service:

- **SMTP Server**: Mail server address
- **SMTP Port**: Server port (25/465/587)
- **From Address**: Sender email address
- **From Name**: Display sender name
- **SMTP Username**: SMTP auth username
- **SMTP Password**: SMTP auth password
- **Encryption**: SSL/TLS encryption

### Email Templates

Configure email content:

- **Registration Email**: Registration verification
- **Password Reset**: Password reset email
- **Order Notification**: Order-related notices
- **System Notification**: System messages
- **Marketing Email**: Marketing campaigns

### Email Testing

Test email configuration:

- Send test email
- Verify configuration
- Check delivery rate
- View send logs

## SMS Configuration

### SMS Provider

Configure SMS service:

- **Provider**: Alibaba Cloud/Tencent Cloud/Other
- **AccessKey**: API access key
- **AccessSecret**: API secret
- **SMS Signature**: SMS sender signature
- **SMS Template**: SMS content template

### SMS Templates

Configure SMS content:

- **Verification Code**: Login/register verification
- **Notification SMS**: Order, renewal notices
- **Marketing SMS**: Campaign promotions

### SMS Testing

Test SMS functionality:

- Send test SMS
- Verify configuration
- View send records

## Storage Configuration

### Local Storage

Local file storage:

- **Storage Path**: File storage directory
- **Access URL**: File access address
- **Max Size**: Single file size limit
- **Allowed Types**: Allowed file types

### Cloud Storage

Object storage service:

**Alibaba Cloud OSS**:
- Endpoint
- AccessKey ID
- AccessKey Secret
- Bucket name
- CDN domain

**Tencent Cloud COS**:
- SecretId
- SecretKey
- Bucket
- Region
- CDN domain

**AWS S3**:
- Access Key
- Secret Key
- Bucket
- Region
- CDN

### CDN Configuration

CDN acceleration:

- **CDN Domain**: Acceleration domain
- **Cache Rules**: Cache policy
- **Hotlink Protection**: Anti-hotlinking
- **HTTPS**: HTTPS configuration

## Security Configuration

### Access Control

Control system access:

- **Maintenance Mode**: Enable maintenance
- **IP Whitelist**: Allowed IPs
- **IP Blacklist**: Blocked IPs
- **Rate Limiting**: API rate limits
- **Login Limits**: Failed login attempts

### Password Policy

Set password security policy:

- **Min Length**: Minimum password length
- **Complexity**: Must include letters/numbers/symbols
- **Expiration**: Password validity period
- **History**: Cannot reuse old passwords
- **Initial Password**: Default password rules

### Two-Factor Authentication

Two-step verification:

- **Enable 2FA**: Mandatory or optional
- **Auth Method**: SMS/Email/TOTP
- **Valid Time**: Verification code validity
- **Backup Method**: Alternative verification

### SSL/TLS

HTTPS security:

- **Force HTTPS**: Enforce HTTPS
- **SSL Certificate**: Upload SSL certificate
- **HSTS**: HTTP Strict Transport Security
- **Certificate Renewal**: Auto-renewal

## Cache Configuration

### Cache Type

Select cache method:

- **File Cache**: Use file system
- **Redis Cache**: Use Redis
- **Memcached**: Use Memcached

### Redis Settings

Redis cache configuration:

- **Redis Host**: Redis server address
- **Redis Port**: Default 6379
- **Redis Password**: Auth password
- **Database**: Redis database number
- **Prefix**: Cache key prefix

### Cache Management

Manage system cache:

- **Clear Cache**: Clear all cache
- **Refresh Cache**: Refresh specific cache
- **Cache Stats**: View cache usage
- **Warm Cache**: Preload common data

## Queue Configuration

### Queue Driver

Configure task queue:

- **Sync**: Synchronous execution
- **Database**: Use database queue
- **Redis**: Use Redis queue
- **Other**: RabbitMQ etc.

### Queue Settings

Queue configuration:

- **Queue Name**: Queue identifier
- **Retry**: Retry attempts on failure
- **Timeout**: Task execution timeout
- **Concurrency**: Concurrent execution count

### Queue Monitoring

Monitor queue status:

- **Queue Length**: Pending tasks
- **Running**: Tasks in progress
- **Failed**: Failed tasks
- **History**: Execution history

## Log Configuration

### Log Settings

Configure system logs:

- **Log Level**: DEBUG/INFO/WARNING/ERROR
- **Log Channel**: File/Database/Cloud
- **Retention**: Log retention days
- **Rotation**: Log file rotation policy

### Log Types

Different log types:

- **System Logs**: System runtime logs
- **Error Logs**: Errors and exceptions
- **Access Logs**: HTTP access logs
- **Operation Logs**: User operation logs
- **Security Logs**: Security-related logs

### Log Viewing

View and analyze logs:

- **Real-time Logs**: Live log viewing
- **Log Search**: Search log content
- **Log Filtering**: Filter by conditions
- **Log Export**: Export log files

## Scheduled Tasks

### Task Configuration

Configure scheduled tasks:

- **Task Name**: Task identifier
- **Schedule**: Cron expression
- **Task Type**: Task execution type
- **Parameters**: Task parameters
- **Status**: Enable or disable

### Task Management

Manage scheduled tasks:

- **Enable/Disable**: Control execution
- **Run Now**: Manual trigger
- **History**: View execution records
- **Task Logs**: View execution logs

### Common Tasks

System preset tasks:

- **Data Statistics**: Daily statistics
- **Data Cleanup**: Clean expired data
- **Email Sending**: Batch email sending
- **Order Check**: Check order status
- **Auto Renewal**: Automatic renewal
- **Backup**: Data backup tasks

## Notification Configuration

### Notification Channels

Configure notification methods:

- **In-app**: System messages
- **Email**: Email push
- **SMS**: SMS push
- **Webhook**: HTTP callbacks
- **Push Service**: App push

### Notification Events

Configure notification events:

- **User Registration**: New user registration
- **Order Payment**: Order payment notice
- **Subscription Expiry**: Expiry reminder
- **Ticket Created**: New ticket notice
- **System Alert**: System anomalies

### Notification Templates

Configure notification content:

- **Template Management**: Manage templates
- **Variable Substitution**: Dynamic variables
- **Multi-language**: Multi-language templates
- **Template Testing**: Test templates

## API Configuration

### API Settings

API interface configuration:

- **API Toggle**: Enable or disable API
- **API Keys**: Generate API keys
- **API Domain**: API access domain
- **Version Control**: API versioning
- **Documentation**: API docs link

### API Restrictions

API access control:

- **Rate Limiting**: Requests per minute
- **Concurrency**: Concurrent requests
- **IP Restrictions**: IP access control
- **Signature Verification**: API signatures

### Webhook

Webhook configuration:

- **Callback URL**: Webhook URL
- **Event Subscription**: Subscribed events
- **Secret Key**: Signature verification
- **Retry Policy**: Retry on failure

## Third-party Integration

### Payment Integration

Integrate payment services:

- Alipay
- WeChat Pay
- PayPal
- Stripe
- Cryptocurrency

### Analytics Integration

Integrate analytics tools:

- Google Analytics
- Baidu Analytics
- Umeng Analytics
- Custom tracking code

### Support Integration

Integrate support systems:

- Live chat
- Zendesk
- Intercom
- Custom support system

## Maintenance Mode

### Enable Maintenance

System maintenance mode:

- **Maintenance Toggle**: Enable maintenance
- **Maintenance Message**: Display message
- **Whitelist**: Accessible IPs during maintenance
- **Estimated Time**: Completion time

### Maintenance Settings

Maintenance configuration:

- **Maintenance Page**: Custom maintenance page
- **Allow Access**: Accessible paths
- **Redirect**: Redirect during maintenance
- **Scheduled**: Schedule maintenance

## System Optimization

### Performance Optimization

Optimize system performance:

- **Enable Cache**: Enable various caches
- **Static Assets**: CDN acceleration
- **Database**: Database optimization
- **Image Optimization**: Compression and lazy loading
- **Code Optimization**: Minification and bundling

### Database Optimization

Database performance:

- **Index Optimization**: Add appropriate indexes
- **Query Optimization**: Optimize slow queries
- **Data Archiving**: Archive historical data
- **Data Cleanup**: Clean unused data

## Backup & Recovery

### Data Backup

Data backup configuration:

- **Auto Backup**: Scheduled automatic backup
- **Backup Content**: Database/Files
- **Backup Location**: Local/Cloud storage
- **Retention**: Retention count and time
- **Notification**: Backup completion notice

### Data Recovery

Data recovery operations:

- **Select Backup**: Choose backup file
- **Confirm Recovery**: Confirm operation
- **Execute Recovery**: Perform recovery
- **Verify**: Verify data integrity

## System Monitoring

### Server Monitoring

Monitor server status:

- **CPU Usage**: CPU utilization
- **Memory Usage**: Memory utilization
- **Disk Space**: Disk usage
- **Network Traffic**: Network usage
- **Process Status**: Process status

### Application Monitoring

Monitor application status:

- **Online Users**: Current online users
- **Request Rate**: Requests per second
- **Response Time**: Average response time
- **Error Rate**: Error occurrence rate
- **Queue Status**: Queue task status

### Alert Settings

Configure monitoring alerts:

- **Alert Rules**: Set alert conditions
- **Alert Methods**: Email/SMS/Webhook
- **Alert Levels**: Warning/Error/Critical
- **Recipients**: Alert recipients

## Best Practices

- Regular data backups
- Timely system updates
- Reasonable cache strategy
- Monitor system status
- Regular data cleanup
- Database optimization
- Security measures
- Log important operations

## Troubleshooting

### Email Send Failure

Check:

1. Is SMTP config correct
2. Is email service enabled
3. Is network connection ok
4. Marked as spam

### Cache Not Working

Possible causes:

1. Cache config error
2. Redis connection failed
3. Cache key issues
4. Cache cleared

### Scheduled Task Not Running

Check:

1. Is task enabled
2. Is cron expression correct
3. Is server time accurate
4. Is queue service running

## Next Steps

- [Auth Control](/admin/system/auth-control) - Configure permissions
- [Payment Config](/admin/system/payment) - Configure payments
- [Log Management](/admin/logs/login-logs) - View system logs
