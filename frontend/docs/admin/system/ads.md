<div v-pre>

# Ads Management

Create and manage platform advertisements with multiple ad types and validity period control.

## Table Column Description

### Status
Switch button to control whether ad is displayed.

### Title
Ad title.

### Type
Ad type (displayed as Badge):
- Banner
- Popup
- Sidebar
- Notice

### Target URL
Link to redirect when ad is clicked.

### Description
Ad description text.

### Validity Period
Ad display time range:
- Start time
- End time

## Table Operations

### Edit
Opens side drawer to modify ad.

### Delete
Deletes ad (requires confirmation), cannot be recovered.

### Create Ad
Adds new advertisement.

## Ad Form

### Title (Required)
Ad title displayed to users.

### Type (Required)
Select ad type:
- **Banner**: Top or bottom banner ad
- **Popup**: Page popup ad
- **Sidebar**: Fixed sidebar ad
- **Notice**: Scrolling notice bar ad

### Target URL (Optional)
URL to redirect when ad is clicked:
- External link: https://example.com
- Internal page: /pricing
- Leave empty for non-clickable

### Description (Optional)
Ad description or detailed content.

### Image URL (Optional, required for some types)
Ad image address:
- Banner and Popup usually need images
- Use external image links
- Recommended sizes: Banner 1920x200, Popup 800x600

### Validity Period (Required)
Set ad display time range:
- Start Time: When ad starts displaying
- End Time: When ad stops displaying
- Can create scheduled ads in advance

### Status (Default disabled)
Control whether ad displays immediately:
- Disabled by default when created
- Displays during validity period when enabled

## Filter Functions

### Status Filter
Select "Enabled" or "Disabled" to view corresponding ads.

### Keyword Search
Search ad titles.

## Usage Scenarios

### Scenario 1: Create Promotional Banner

**Form Config**:
- Title: Double 11 Special Sale
- Type: Banner
- Target URL: /pricing
- Description: 20% off all plans
- Image URL: https://cdn.example.com/banner-1111.jpg
- Validity Period:
  - Start: 2024-11-11 00:00
  - End: 2024-11-11 23:59
- Status: Enabled

### Scenario 2: Create Popup Announcement

**Form Config**:
- Title: Important System Upgrade Notice
- Type: Popup
- Target URL: /announcement/123
- Description: System maintenance tonight 22:00-23:00...
- Image URL: https://cdn.example.com/popup-upgrade.jpg
- Validity Period:
  - Start: 2024-01-15 08:00
  - End: 2024-01-15 23:00
- Status: Enabled

### Scenario 3: Create Sidebar Promotion

**Form Config**:
- Title: Refer Friends for Commission
- Type: Sidebar
- Target URL: /invite
- Description: Invite friends to register, get 10% commission
- Image URL: https://cdn.example.com/sidebar-invite.jpg
- Validity Period:
  - Start: 2024-01-01 00:00
  - End: 2024-12-31 23:59
- Status: Enabled

### Scenario 4: Create Notice Ticker

**Form Config**:
- Title: New Node Online
- Type: Notice
- Target URL: /nodes
- Description: New Los Angeles high-speed node, try it now!
- Validity Period:
  - Start: 2024-01-20 00:00
  - End: 2024-01-27 23:59
- Status: Enabled

## Ad Display Rules

### Display Conditions
Ad must satisfy all:
1. Status is "Enabled"
2. Current time within validity period
3. Corresponding page supports the type

### Display Position
- **Banner**: Top or bottom of page
- **Popup**: Pops up on page load
- **Sidebar**: Fixed on right side of page
- **Notice**: Scrolling bar at top of page

### Display Frequency
- Popup type: Once per user per day
- Other types: Continuous display

## Important Notes

1. **Validity Period**: Expired ads auto-hide, no manual disabling needed
2. **External Images**: Use CDN links for fast loading
3. **Link Testing**: Test target link before creation
4. **Size Standards**: Different ad types need different image sizes
5. **Content Compliance**: Ad content must comply with laws
6. **Create in Advance**: Can create scheduled ads ahead of time
7. **Popup Frequency**: Don't show popups too frequently
8. **Mobile Adaptation**: Ensure images display properly on mobile

</div>
