# Order Management

The Order Management module processes user purchase orders, which is the core of system revenue and business processes.

## Overview

### Order List

View and manage all orders:

- **Order Number**: Unique order identifier
- **User Info**: Buyer name and email
- **Product Info**: Purchased product name and specs
- **Amount**: Paid amount and original price
- **Payment Method**: Alipay/WeChat/Crypto, etc.
- **Status**: Pending/Paid/Completed/Canceled/Refunded
- **Created**: Order creation time
- **Paid**: Payment completion time

### Order Filtering

Quickly find specific orders:

- **By Status**: Pending/Paid/Completed, etc.
- **By Date Range**: Today/This week/This month/Custom
- **By Payment**: Filter by payment channel
- **By User**: View specific user's orders
- **By Product**: View specific product sales
- **By Amount**: Filter by order amount range

### Create Order

Manually create order for user:

#### Select User

- Search existing user
- Or create new user
- Fill in user basic info

#### Select Product

- Choose package from product list
- Set purchase quantity
- View price details

#### Discount Settings

- Apply coupons
- Manual discount
- Balance deduction
- Points deduction

#### Order Notes

- Add order notes
- Mark special orders
- Record communications

### Order Details

View complete order information:

#### Basic Info

- Order number and creation time
- User info and contact
- Product details and specs
- Order amount breakdown

#### Payment Info

- Payment method and transaction number
- Payment time and status
- Third-party platform order number
- Payment proof (if any)

#### Order Status

- Current order status
- Status change history
- Operation log records

#### After-sales Info

- Refund request records
- Customer service communications
- Issue resolution progress

## Order Operations

### Order Review

Review pending orders:

- **Auto Review**: Online payment auto-complete
- **Manual Review**: Bank transfer needs confirmation
- **Approve**: Activate service and notify user
- **Reject**: Reject order with reason

### Order Processing

Process paid orders:

- **Auto Activation**: Auto-activate after payment
- **Manual Activation**: Admin manually activates
- **Delayed Activation**: Set future activation time
- **Batch Processing**: Process multiple orders

### Order Cancellation

Cancel unpaid or abnormal orders:

- **User Cancel**: User actively cancels
- **Timeout Cancel**: Not paid within time limit
- **Admin Cancel**: Admin manually cancels
- **System Cancel**: Auto-cancel on anomaly detection

### Order Refund

Process refund requests:

#### Refund Review

- Review refund reason
- Evaluate refund validity
- Decide whether to approve

#### Refund Processing

- **Full Refund**: Return full order amount
- **Partial Refund**: Return partial amount
- **Refund to Balance**: Refund to user account
- **Original Return**: Refund to original payment method

#### Post-refund

- Revoke activated services
- Update user account status
- Record refund reason and result

## Payment Management

### Payment Methods

Support multiple payment channels:

- **Alipay**: QR code/Face-to-face payment
- **WeChat Pay**: QR code/H5 payment
- **Cryptocurrency**: USDT/BTC, etc.
- **Bank Transfer**: Offline transfer
- **Balance Payment**: Use account balance

### Payment Config

Configure payment channel parameters:

- **Merchant Info**: Merchant ID/Key
- **Payment Callback**: Async notification URL
- **Payment Limits**: Min/Max payment amount
- **Transaction Fees**: Fee rate and bearer

### Payment Callback

Handle payment platform callbacks:

- **Verify Signature**: Verify callback data authenticity
- **Update Status**: Update order payment status
- **Activate Service**: Auto-activate purchased service
- **Send Notification**: Notify user of successful payment

## Order Statistics

### Sales Statistics

Analyze order sales data:

- **Order Count**: Total orders and growth trend
- **Order Amount**: Total sales and average order value
- **Conversion Rate**: Order conversion analysis
- **Repurchase Rate**: User repurchase situation

### Payment Statistics

Analyze payment method usage:

- **Payment Method Share**: Alipay/WeChat share
- **Payment Success Rate**: Success rate per channel
- **Payment Duration**: Time from order to payment

### Product Statistics

Analyze product sales:

- **Best Sellers**: Top-selling products
- **Revenue Contribution**: Revenue share per product
- **Stock Alert**: Low-stock products

## Order Export

Export order data for analysis:

### Export Options

- **Export Format**: Excel/CSV/PDF
- **Export Range**: All/Filtered results
- **Export Fields**: Custom export fields
- **Data Masking**: Mask sensitive information

### Export Purposes

- **Financial Reconciliation**: Verify revenue data
- **Data Analysis**: Conduct business analysis
- **Report Generation**: Generate sales reports
- **Backup Archive**: Data backup and archive

## Abnormal Order Handling

### Anomaly Types

- **Duplicate Payment**: Same order paid multiple times
- **Payment Not Received**: Paid but system didn't receive
- **Amount Mismatch**: Payment amount differs from order
- **Malicious Orders**: Fraud or fake orders

### Handling Process

1. **Identify Anomaly**: System auto-marks or manual detection
2. **Investigate**: Check payment records and logs
3. **Contact User**: Communicate to confirm situation
4. **Resolution**: Refund/Resend/Manual handling
5. **Record**: Document process and result

## Order Security

### Risk Control

- **Identity Verification**: Require user verification
- **Payment Limits**: Set per-transaction limits
- **Anomaly Detection**: Detect abnormal payment behavior
- **Blacklist**: Block malicious users

### Anti-fraud

- **Rate Limiting**: Limit order frequency
- **IP Detection**: Detect abnormal IP behavior
- **Device Fingerprint**: Identify duplicate devices
- **Manual Review**: Review suspicious orders

## Best Practices

- Process pending orders promptly
- Ensure payment callback stability
- Regularly reconcile financial data
- Respond quickly to refund requests
- Maintain complete operation logs
- Analyze order data to optimize operations

## Troubleshooting

### Payment Successful But Not Received

Steps:

1. Check payment platform order status
2. Review payment callback logs
3. Manually trigger callback processing
4. Contact payment platform support

### Cannot Cancel Order

Possible reasons:

1. Order already paid
2. Service already activated
3. Insufficient system permissions

### Refund Failed

Check:

1. Is refund API configured correctly
2. Is account balance sufficient
3. Is refund info complete
4. Has refund deadline passed

## Next Steps

- [Coupon Management](/admin/commerce/coupons) - Create promotions
- [User Management](/admin/users-support/users) - Manage user accounts
- [Financial Statistics](/admin/logs/balance) - View transaction details
