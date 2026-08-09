<div v-pre>

# Announcement Management

Create and manage system announcements with display control, pinning, and popup features.

## Table Column Description

### Show
Switch button to control whether the announcement displays on the frontend.

### Pinned
Switch button to control whether the announcement is pinned to top.

### Popup
Switch button to control whether to show announcement as popup when users visit.

### Title
Announcement title.

### Content
Announcement body content (supports Markdown).

### Updated At
Last update time.

## Table Operations

### Edit
Opens side drawer form to modify announcement information.

### Delete
Deletes announcement (requires confirmation), cannot be recovered.

### Batch Delete
Deletes multiple selected announcements.

## Announcement Form

### Title (Required)
Announcement title text.

### Content (Required)
Announcement body content, supports Markdown format:
- Headings: # ## ###
- Bold: **text**
- Italic: *text*
- Lists: - item
- Links: [text](url)
- Code: `code`

## Filter Functions

### Enable Filter
- Show: View displayed announcements
- Hide: View hidden announcements

### Keyword Search
Search announcements by title or content.

## Usage Scenarios

### Scenario 1: Create Important Notice

**Form Config**:
- Title: System Maintenance Notice
- Content:
  ```
  # System Maintenance Notice

  The system will undergo maintenance upgrade on **Jan 1, 2024 02:00-04:00**.

  ## Affected Scope
  - Website temporarily unavailable
  - Services unaffected

  Thank you for your understanding!
  ```
- Show: On
- Pinned: On
- Popup: On

### Scenario 2: Create Activity Announcement

**Form Config**:
- Title: Double 11 Sale
- Content:
  ```
  ## 🎉 Double 11 Sale

  - All plans **20% OFF**
  - Annual plans get extra **30 days**
  - Period: 11.11-11.13

  [Buy Now](/subscribe)
  ```
- Show: On
- Pinned: On
- Popup: No

### Scenario 3: Create Usage Guide

**Form Config**:
- Title: Beginner's Guide
- Content:
  ```
  # Beginner's Guide

  ## 1. Purchase Plan
  Go to [Subscribe Page](/subscribe) and select a plan

  ## 2. Download Client
  Visit [Documentation](/docs) to download client

  ## 3. Import Config
  Copy subscription link to client
  ```
- Show: On
- Pinned: No
- Popup: No

## Important Notes

1. **Markdown Support**: Content supports Markdown for beautiful formatting
2. **Popup Feature**: When enabled, users see popup on every visit
3. **Pinned Display**: Pinned announcements appear at top of list
4. **Display Control**: Can create first, then enable display later
5. **Batch Delete**: Delete operation irreversible, use carefully
6. **Update Time**: Timestamp updates on every edit

</div>
