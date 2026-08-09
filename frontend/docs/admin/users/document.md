# Document Management

Create and manage help documents with Markdown format and tag classification.

## Table Column Description

### Show
Switch button to control whether document displays on frontend.

### Title
Document title.

### Tags
Document classification tags, multiple tags separated by commas.

### Updated At
Last update time.

## Table Operations

### Edit
Opens side drawer form to modify document.

### Delete
Deletes document (requires confirmation), cannot be recovered.

### Batch Delete
Deletes multiple selected documents.

## Document Form

### Title (Required)
Document title.

### Tags (Required)
Document classification tags, supports multiple tags:
- Common tags: Beginner Guide, Tutorial, FAQ, Technical Support
- Press Enter after inputting tag to add
- Click tag to delete

### Content (Required)
Document body, supports Markdown format:
- Headings: # ## ### ####
- Bold: **text**
- Italic: *text*
- Code blocks: \`\`\`language
- Images: `![alt](url)`
- Links: `[text](url)`
- Lists: - or 1.
- Quotes: >
- Tables: | Col1 | Col2 |

## Filter Functions

### Keyword Search
Search documents by title.

### Tag Filter
Input tag to find documents in that category.

## Usage Scenarios

### Scenario 1: Create Beginner Guide

**Form Config**:
- Title: Quick Start Guide
- Tags: Beginner Guide, Tutorial
- Content:
  ```markdown
  # Quick Start Guide

  ## 1. Register Account
  Visit website to register...

  ## 2. Purchase Plan
  Go to subscribe page...

  ## 3. Download Client
  Supported platforms:
  - Windows
  - macOS
  - Android
  - iOS
  ```
- Show: On

### Scenario 2: Create FAQ

**Form Config**:
- Title: Frequently Asked Questions
- Tags: FAQ, Common Issues
- Content:
  ```markdown
  # FAQ

  ## How to reset password?
  A: Click "Forgot Password" on login page...

  ## How to check traffic usage?
  A: View in profile after login...

  ## What to do after subscription expires?
  A: Can renew or purchase new plan...
  ```
- Show: On

### Scenario 3: Create Platform Tutorial

**Form Config**:
- Title: Windows Client Tutorial
- Tags: Tutorial, Windows
- Content:
  ```markdown
  # Windows Client Tutorial

  ## Download & Install
  1. Download client
  2. Run installer
  3. Complete installation

  ## Configure Subscription
  1. Copy subscription link
  2. Open client
  3. Import subscription

  ## Connect Service
  Select node and click connect
  ```
- Show: On

## Important Notes

1. **Markdown Support**: Content supports full Markdown syntax
2. **Tag Management**: Proper tags help users find content
3. **Display Control**: Can create first, enable display later
4. **Image Links**: Use external URLs for images
5. **Code Highlighting**: Code blocks support syntax highlighting
6. **Batch Operations**: Can batch delete outdated documents
7. **Search Optimization**: Titles and tags are search indexed
8. **Update Indicator**: Update time changes after modification
