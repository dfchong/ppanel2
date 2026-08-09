# Coupon Management

The Coupon Management module creates and manages various coupons, which is an important tool for promotional activities.

## Overview

### Coupon List

View and manage all coupons:

- **Coupon Name**: Display name
- **Coupon Type**: Spend threshold/Discount/Voucher
- **Discount Amount**: Reduction or discount percentage
- **Usage Conditions**: Minimum spend required
- **Distribution**: Total and remaining quantity
- **Validity**: Valid time range
- **Applicable Scope**: Applicable products or users
- **Status**: Active/Ended/Paused

### Create Coupon

Create new coupon:

#### Basic Info

- **Coupon Name**: Identifiable name
- **Description**: Detailed discount description
- **Coupon Code**: Redemption code (auto-generate)
- **Coupon Type**: Select discount type

#### Discount Settings

**Spend Threshold Coupon**
- Spend X get Y off
- Multi-tier thresholds

**Discount Coupon**
- Discount percentage (e.g., 20% off)
- Maximum discount cap

**Voucher**
- Direct fixed amount deduction
- Or redeem specific product

#### Usage Conditions

- **Minimum Spend**: Order threshold
- **Applicable Products**: Specified products
- **Applicable Users**: New/Existing/All
- **Usage Limit**: Times per person
- **Stacking Rules**: Combine with other offers

#### Distribution Settings

- **Distribution Method**:
  - Public claim: Everyone can claim
  - Targeted: Specific users
  - Redemption code: Enter code to claim
  - Auto-distribution: Auto-grant on conditions

- **Distribution Quantity**: Total limit
- **Claim Limit**: Per-person claim limit

#### Validity Settings

- **Fixed Time**: Specific start/end dates
- **Days After Claim**: Valid N days after claim
- **Permanent**: No expiration

### Edit Coupon

Modify coupon config:

- Adjust discount amount and conditions
- Increase distribution quantity
- Extend validity period
- Modify applicable scope

::: tip Tip
Config changes don't affect coupons already claimed by users.
:::

### Delete Coupon

Delete coupon:

- **Soft Delete**: Deactivate but keep data
- **Hard Delete**: Permanently delete
- Used coupon records are retained

## Coupon Types

### Spend Threshold

Discount after meeting amount:

**Use Cases**:
- Promote large orders
- Increase AOV
- Clearance sales

**Examples**:
- $10 off $100
- $30 off $200
- $100 off $500

### Discount

Percentage discount:

**Use Cases**:
- Holiday promotions
- Member exclusive
- New product launch

**Examples**:
- 10% off
- 20% off (max $50)
- 30% off (new users only)

### Voucher

Direct amount deduction:

**Use Cases**:
- User compensation
- Promotion rewards
- Points redemption

**Examples**:
- $10 no-threshold voucher
- $50 trial voucher
- $100 cash voucher

### Product Voucher

Redeem specific product:

**Use Cases**:
- Gift distribution
- Event rewards
- Points store

**Examples**:
- 1-month package voucher
- 100GB traffic voucher

## Coupon Distribution

### Batch Distribution

Distribute coupons to multiple users:

1. Select coupon to distribute
2. Select target user group
3. Set distribution quantity
4. Confirm distribution

**Target Recipients**:
- All users
- Specific user groups
- Newly registered
- High-value users
- At-risk churners

### Redemption Code

Generate coupon codes:

- **Batch Generate**: Generate multiple codes
- **Custom Prefix**: Set code prefix
- **Export Codes**: Export Excel file
- **Code Management**: View usage status

### Auto-Distribution

Configure auto-distribution rules:

**Trigger Conditions**:
- On user registration
- After first purchase
- Before subscription expiry
- On spending milestone
- On birthday

**Distribution Content**:
- Specific coupon
- Random coupon
- Tiered coupons

## Coupon Usage

### Usage Flow

User coupon usage process:

1. **Claim Coupon**: User claims or receives coupon
2. **View Coupons**: Check available coupons in account
3. **Order Usage**: Select coupon when placing order
4. **System Validation**: Verify usage conditions
5. **Calculate Discount**: Auto-calculate discount
6. **Complete Payment**: Pay discounted price

### Usage Restrictions

Control coupon usage:

- **Single Use**: Limit coupons per order
- **Time Restriction**: Specific time periods
- **Product Restriction**: Specific products
- **User Restriction**: Specific user groups
- **Device Restriction**: Limit devices

### Usage Rules

Coupon usage rule settings:

- **Priority**: Order of multiple coupons
- **Stacking**: Combine with other offers
- **Partial Refund**: Coupon handling on refund
- **Expiry Reminder**: Notify before expiration

## Coupon Statistics

### Distribution Stats

Track coupon distribution:

- **Total Distributed**: Distributed quantity
- **Claim Rate**: Claim rate and users
- **Stock Remaining**: Available quantity
- **Distribution Trend**: Daily distribution changes

### Usage Stats

Analyze coupon usage:

- **Usage Rate**: Used/Distributed ratio
- **Discount Amount**: Total discount given
- **Orders with Coupons**: Order count
- **Users with Coupons**: User count

### Effect Analysis

Evaluate coupon effectiveness:

- **Conversion Rate**: Purchase conversion after claim
- **AOV**: Average order value with coupons
- **ROI Analysis**: Return on investment
- **User Distribution**: User profile

## Coupon Promotion

### Promotion Channels

Promote coupons through channels:

- **On-site**: Homepage banner, popups
- **Email**: Send coupon emails
- **SMS**: SMS notifications
- **Social Media**: Share to social platforms
- **Referral Links**: Generate exclusive links

### Promotion Activities

Plan coupon campaigns:

- **Limited Flash**: Limited-time coupon grab
- **Share to Claim**: Get coupons after sharing
- **Check-in**: Daily check-in rewards
- **Referral Bonus**: Refer friends get coupons
- **Purchase Rebate**: Get coupons after purchase

## Coupon Templates

### Common Templates

Preset common coupon templates:

- New user exclusive
- Member birthday coupon
- Holiday promotion
- Spend threshold coupon
- Repurchase coupon

### Custom Templates

Create custom templates:

- Save common configs
- Quick create similar coupons
- Copy and edit templates

## Risk Control

### Anti-fraud

Prevent malicious coupon abuse:

- **Claim Limits**: IP, device restrictions
- **Identity Verification**: Require verification
- **Usage Monitoring**: Monitor abnormal usage
- **Blacklist**: Block fraudulent users

### Risk Alerts

Coupon risk warnings:

- Abnormal claiming alerts
- Low stock reminders
- Budget overrun warnings
- Fraud behavior alerts

## Best Practices

- Set reasonable thresholds to avoid losses
- Control total distribution and budget
- Regularly analyze coupon effectiveness
- Target different user groups
- Coordinate with marketing campaigns
- Clean up expired and invalid coupons

## Troubleshooting

### Cannot Use Coupon

Check:

1. Are usage conditions met
2. Is coupon expired
3. Is product in applicable scope
4. Is minimum spend reached

### Incorrect Discount

Possible reasons:

1. Coupon config error
2. Multiple coupon stacking issues
3. Threshold tier settings

### Distribution Failed

Check:

1. Is stock sufficient
2. Does user meet claim conditions
3. Is system configured correctly

## Next Steps

- [Marketing Management](/admin/commerce/marketing) - Create campaigns
- [Order Management](/admin/commerce/orders) - View coupon usage
- [User Management](/admin/users-support/users) - Distribute coupons
