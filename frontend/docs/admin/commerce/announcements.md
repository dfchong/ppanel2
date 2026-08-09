# Announcement Management

The Announcement Management module publishes and manages system announcements to communicate important information to users.

## Overview

### Announcement List

View and manage all announcements:

- **Title**: Announcement topic
- **Type**: System/Maintenance/Activity/Update
- **Status**: Draft/Published/Offline
- **Publish Time**: Publication datetime
- **Display Position**: Homepage/User Center/Admin
- **Priority**: High/Medium/Low
- **Views**: View count

### Create Announcement

Publish new announcement:

#### Basic Info

- **Title**: Concise title
- **Type**: Select type
- **Content**: Detailed content (rich text)
- **Summary**: Brief summary (list display)

#### Display Settings

- **Display Position**: Choose locations
  - Homepage Banner
  - Announcement Bar
  - User Center
  - Admin Panel
  - Popup Alert

- **Display Style**: Configure style
  - Banner style
  - List style
  - Popup style
  - Floating alert

#### Publish Settings

- **Publish Time**:
  - Publish now
  - Scheduled publish
  - Specific datetime

- **Offline Time**:
  - Permanent display
  - Specific offline time
  - Manual offline

- **Priority**: Set display priority

#### Target Users

- **All Users**: Show to everyone
- **New Users**: New registrations only
- **Existing Users**: Existing users only
- **Specific Groups**: Designated groups
- **VIP Users**: VIP users only

### Edit Announcement

Modify published announcement:

- Update content
- Adjust display settings
- Modify publish time
- Change target users

::: tip Tip
Modifying published announcements affects live display. Use caution.
:::

### Delete Announcement

Remove announcement:

- **Offline**: Stop display but keep data
- **Delete**: Permanently remove
- Reading records retained for stats

## Announcement Types

### System Announcement

Important system notifications:

**Use Cases**:
- System upgrade notice
- Terms of service changes
- Policy adjustments
- Major feature launches

**Examples**:
- System maintenance at XX time
- Service agreement update
- New feature announcement

### Maintenance Announcement

System maintenance notices:

**Use Cases**:
- Scheduled maintenance
- Incident explanation
- Service recovery notice

**Examples**:
- Regular maintenance notice
- Emergency incident alert
- Service restored notification

### Activity Announcement

Marketing activity notices:

**Use Cases**:
- Promotion preview
- Discount information
- Activity rules

**Examples**:
- Double 11 sale preview
- Limited-time offer
- New user exclusive

### Update Announcement

Product update notes:

**Use Cases**:
- Feature updates
- Product optimization
- Bug fix notes

**Examples**:
- v2.0 update notes
- New XX feature
- Performance optimization

## Announcement Display

### Banner

Homepage carousel banner:

- Large image, strong visual impact
- Multi-image carousel
- Click to detail page
- Suitable for major campaigns

### List

Announcement list display:

- Title list format
- Category filtering
- Click for details
- Suitable for regular announcements

### Popup

Popup alert:

- Display on login
- Mandatory reading
- Close after confirmation
- Suitable for important notices

### Floating Bar

Floating alert bar:

- Float at page top
- Manually closable
- Non-intrusive
- Suitable for tips

## Announcement Push

### On-site Push

Push within system:

- **Homepage Display**: Prominent position
- **Message Center**: Push to message center
- **Popup Alert**: Login popup
- **Email Push**: Send email

### Targeted Push

Push to specific users:

- Push by user group
- Push by user tags
- Push by user behavior
- Personalized content

### Push Timing

Choose optimal timing:

- **Immediate**: Urgent announcements
- **Scheduled**: Optimal time
- **Event Triggered**: Specific events
- **Periodic**: Regular push

## Statistics

### Reading Stats

Track reading:

- **Views**: View count
- **Read Rate**: Reading user ratio
- **Readers**: User list
- **Time Distribution**: Reading time

### Click Stats

Track clicks:

- **Clicks**: Click count
- **Click Rate**: Click/impression ratio
- **Link Tracking**: External link clicks
- **Conversion**: Announcement conversions

### Effect Analysis

Analyze effectiveness:

- **Reach Rate**: Push reach rate
- **Engagement**: User engagement
- **Conversion**: Conversion effects
- **User Feedback**: Feedback opinions

## Templates

### Common Templates

Preset templates:

- **Maintenance Template**: Standard format
- **Campaign Template**: Activity format
- **Update Template**: Update notes format
- **Urgent Template**: Emergency format

### Custom Templates

Create custom templates:

- Design announcement style
- Define content structure
- Save as template
- Reuse templates

## Approval

### Approval Flow

Announcement approval:

1. **Create Draft**: Edit content
2. **Submit**: Submit for review
3. **Review**: Reviewer checks
4. **Publish**: Publish after approval
5. **Monitor**: Track after publish

### Approval Permissions

Set permissions:

- **Create**: Who can create
- **Review**: Who can review
- **Publish**: Who can publish
- **Delete**: Who can delete

## Best Practices

### Content Writing

- Clear, concise title highlighting key points
- Accurate, complete content avoiding ambiguity
- Plain language, user-friendly
- Bold important information
- Provide contact information

### Publish Timing

- Choose active user periods
- Avoid holidays for important notices
- Urgent announcements publish immediately
- Regular announcements schedule ahead

### Frequency Control

- Avoid over-notification
- Control announcement quantity
- Prioritize important announcements
- Clean up expired announcements

### Effect Tracking

- Monitor reading data
- Collect user feedback
- Analyze effectiveness
- Continuous optimization

## Scenario Examples

### Maintenance Notice

**Title**: System Maintenance Notice

**Content**:
- Time: 2024-01-01 02:00-06:00
- Content: System upgrade and optimization
- Impact: All services temporarily unavailable
- Compensation: 1 day membership extension

### Campaign Preview

**Title**: Double 11 Festival

**Content**:
- Time: Nov 11 00:00-23:59
- Content: 50% off sitewide
- Coupons: $20 off $100
- How to Join: Click for details

### Feature Launch

**Title**: New Feature Launch

**Content**:
- Feature: Traffic statistics
- Description: Real-time traffic tracking
- How to Use: User Center - Traffic Stats
- Feedback: Welcome suggestions

## Troubleshooting

### Announcement Not Showing

Check:

1. Is announcement published
2. Is publish time correct
3. Is target user setting correct
4. Is display position correct

### Display Anomaly

Possible causes:

1. Content format issues
2. Image link broken
3. Style conflicts
4. Browser compatibility

### Push Failed

Check:

1. Is push config correct
2. Is user contact valid
3. Is push service working
4. Reached push limits

## Next Steps

- [Marketing Management](/admin/commerce/marketing) - Plan campaigns
- [User Management](/admin/users-support/users) - Manage target users
- [System Config](/admin/system/config) - Configure announcement system
