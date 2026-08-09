<div v-pre>

# Ticket Management

View and handle user-submitted tickets with reply and close functions.

## Table Column Description

### Title
Ticket title.

### User
User who submitted the ticket.

### Status
Current ticket status (with color indicator):
- **Pending Follow-up** (Red) - Newly submitted, awaiting admin
- **Pending Reply** (Yellow) - Admin replied, awaiting user
- **Resolved** (Green) - Issue resolved
- **Closed** (Gray) - Ticket closed

### Updated At
Last update time.

## Table Operations

### Reply
Opens ticket conversation drawer:
- View complete ticket conversation
- Input reply content
- After sending, status changes to "Pending Reply"

### Close
Closes ticket (requires confirmation):
- Status becomes "Closed"
- Cannot operate after closure
- User can still view

### Check
View closed ticket conversation (read-only).

## Ticket Conversation

After opening ticket, shows conversation interface:

**Conversation Messages**:
- Ticket description (user's first message)
- All follow-up records
- Shows timestamps
- Distinguishes user/admin messages

**Reply Ticket**:
1. Input reply in bottom text box
2. Click send button
3. Message displays immediately
4. Status auto-updates to "Pending Reply"

**Auto Refresh**:
- Auto-refreshes every 5 seconds
- Gets latest messages

## Filter Functions

### Status Filter
Select "Closed" to view closed tickets.

## Usage Scenarios

### Scenario 1: Handle New Ticket

1. View "Pending Follow-up" tickets
2. Click "Reply" button
3. Read user's question
4. Input solution
5. Send reply
6. User receives notification

### Scenario 2: Close After Resolution

1. Open ticket conversation
2. Confirm issue resolved
3. Click "Close" button
4. Confirm close operation
5. Ticket marked as closed

### Scenario 3: Multiple Rounds of Conversation

1. Open ticket
2. View conversation history
3. Reply with new message
4. Continue following up until resolved

## Important Notes

1. **Timely Reply**: Pending tickets should be handled promptly
2. **Conversation Records**: All messages permanently saved
3. **Auto Refresh**: Conversation auto-updates every 5 seconds
4. **Close Restriction**: Cannot reply after closure
5. **Status Change**: Auto-changes to "Pending Reply" after replying
6. **User Notification**: User receives notification after reply
7. **View Closed**: Closed tickets viewable but not replyable

</div>
