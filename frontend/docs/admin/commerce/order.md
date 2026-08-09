<div v-pre>

# Order Management

View all user orders in the system with support for order status modification and detailed information viewing. This is primarily a read-only order query page, mainly used for order information viewing and exception handling.

## Page Functions

The Order Management page is a simple order query and status management tool, providing the following features:

1. **Order List Viewing** - Display all orders in a table
2. **Status Modification** - Modify orders with specific statuses
3. **Amount Details** - View price breakdown via hover card
4. **Filter & Search** - Quickly locate target orders

## Table Column Description

### Order Number
System-generated unique order identifier for order tracking and querying.

### Type
Business type of the order:
- **New Purchase** - User's first purchase of a plan
- **Renewal** - Extends time for existing subscription
- **Reset Traffic** - Separately purchase traffic reset
- **Recharge** - Recharge account balance

### Subscribe
Displays associated product information:
- New Purchase/Renewal/Reset Traffic orders: Shows `Product Name × Quantity`
- Recharge orders: Shows "Recharge"

### Amount
Total order amount, click to view detailed price breakdown.

### User
Order user information, click to view user details.

### Update Time
Last order status change time.

### Status
Current order status, some statuses support modification:
- **Pending** (Orange) - Modifiable
- **Paid** (Green) - Read-only
- **Cancelled** (Gray) - Modifiable
- **Closed** (Red) - Modifiable
- **Completed** (Green) - Read-only

## Core Functions

### 1. Order Status Modification

**Modifiable Status**: Pending, Cancelled, Closed

Steps:
1. Find the order to modify
2. Click the dropdown selector in status column
3. Select new status
4. System auto-saves and refreshes

**Non-modifiable Status**: Paid, Completed

These two statuses display as read-only badges and cannot be modified.

**Common Operations**:
- Pending → Paid: Manually mark payment complete
- Pending → Cancelled: Cancel timeout orders
- Pending → Closed: Close abnormal orders
- Cancelled → Pending: Restore misoperated orders

### 2. View Amount Details

Hover mouse over amount to display complete price breakdown:

**Price Composition**:
- Subscribe Price - Product original price
- Discount - Bulk purchase discount
- Coupon Discount - Coupon used
- Fee Amount - Payment platform fee
- Total - Actual payment amount

**Other Information**:
- Trade No - Third-party payment transaction number
- Payment Method - Payment platform used

### 3. Filter and Search

**Status Filter**: Select order status to view corresponding orders

**Product Filter**: Select product plan to view related orders

**User Filter**: Input user ID to view all orders for that user

**Keyword Search**: Input order number for exact search

Multiple filter conditions can be used simultaneously.

## Usage Scenarios

### Scenario 1: Manually Mark Payment Complete

User payment successful but order status not auto-updated:

1. Search for order using order number
2. Click amount to view trade number
3. Confirm payment received on third-party platform
4. Click status dropdown and select "Paid"
5. System auto-processes and allocates benefits

### Scenario 2: Cancel Timeout Orders

Regularly clean up timeout unpaid orders:

1. Filter "Pending" status
2. Check update time to determine timeout
3. Click status and select "Cancelled"
4. Order marked as cancelled

### Scenario 3: User Order Query

User inquires about order issue:

1. Input user ID in user filter
2. View all orders for that user
3. Find corresponding order and check status
4. Click amount to view detailed information
5. Handle issue based on situation

### Scenario 4: Product Sales Query

View sales for a specific product:

1. Select plan in product filter
2. View all orders for that product
3. Check order counts by different statuses
4. Analyze sales trends

## Important Notes

1. **Partial Status Modification** - Only Pending, Cancelled, Closed can be modified
2. **Paid Cannot Change** - Paid and Completed orders cannot be modified
3. **Modify Carefully** - Status changes trigger benefit updates
4. **Verify Payment** - Confirm actual payment before marking as Paid
5. **Price Details** - Verify price calculation via amount hover card
6. **User Issues** - Use user filter to quickly query user orders

</div>
