<div v-pre>

# Coupon Management

Manage coupons in the system, including creating, editing, and enabling/disabling functions. Coupons provide purchase discounts for users.

## Table Column Description

### Enable
Switch button to control whether the coupon is available. When off, users cannot use this coupon.

### Name
Coupon name for management identification.

### Code
Coupon redemption code that users enter during purchase to apply the coupon.

### Type
Coupon discount type:
- **Percentage** - Discount by percentage (e.g., 10%)
- **Amount** - Fixed amount discount (e.g., $50)

### Discount
Discount value:
- Percentage type shows percentage (e.g., 10%)
- Amount type shows currency amount (e.g., $50)

### Count
Displays three lines of information:
- **Count** - Total available usage count (0 = unlimited)
- **Remaining** - Remaining usage count
- **Usage Times** - Times already used

### Validity Period
Coupon's valid time range:
- Shows start time and end time
- If only start time, shows single time
- No restriction shows "--"

## Table Operations

### Edit
Opens side drawer form to modify coupon information.

### Delete
Deletes coupon (requires confirmation), used coupons can also be deleted.

### Batch Delete
Deletes multiple selected coupons.

## Coupon Form

### Name (Required)
Management name for the coupon, not displayed to users.

### Custom Coupon Code (Optional)
Custom redemption code, leave blank for system auto-generation.

### Coupon Type (Required)
Radio button to select type:
- **Percentage Discount** - Discount by order amount percentage
- **Amount Discount** - Fixed amount reduction

### Discount Value (Required)
Input based on type:
- **Percentage**: Enter number 1-100 with % suffix
- **Amount**: Enter currency amount

### Specified Subscription (Optional)
Multi-select dropdown to choose applicable product plans:
- Leave blank for all products
- Select specific products for those only

### Start Time (Optional)
Coupon activation time:
- Use date picker
- Cannot select past dates (before yesterday)
- Leave blank for immediate effect

### Expire Time (Optional)
Coupon expiration time:
- Use date picker
- Leave blank for never expires

### Max Usage Count (Optional)
Total times the coupon can be used:
- 0 or blank for unlimited
- Automatically expires when count reached

### Max Usage Count per User (Optional)
Times a single user can use this coupon:
- 0 or blank for unlimited
- Prevents repeated use by single user

## Filter Functions

### Subscribe Filter
Select product plan to view exclusive coupons for that product.

### Keyword Search
Search coupons by name or code.

## Usage Scenarios

### Scenario 1: Create New User Registration Coupon

**Form Configuration**:
- Name: New User Discount
- Code: NEWUSER2024 (custom)
- Type: Percentage Discount
- Discount: 20%
- Specified Subscription: Leave blank (all products)
- Start Time: 2024-01-01
- Expire Time: 2024-12-31
- Max Usage Count: 0 (unlimited)
- Max Usage Count per User: 1

**Effect**: Each new user can use once, valid all year, 20% off all products.

### Scenario 2: Create Limited-Time Promotion Coupon

**Form Configuration**:
- Name: Double 11 Promotion
- Code: Leave blank (auto-generate)
- Type: Amount Discount
- Discount: $50
- Specified Subscription: Select "Annual Plan"
- Start Time: 2024-11-11 00:00
- Expire Time: 2024-11-11 23:59
- Max Usage Count: 100
- Max Usage Count per User: 1

**Effect**: First 100 users on Double 11 get $50 off annual plan, one per user.

### Scenario 3: Create Exclusive VIP Coupon

**Form Configuration**:
- Name: VIP Exclusive
- Code: VIP888 (custom)
- Type: Percentage Discount
- Discount: 30%
- Specified Subscription: Select "Premium Plan"
- Start Time: Leave blank
- Expire Time: Leave blank
- Max Usage Count: 0 (unlimited)
- Max Usage Count per User: 0 (unlimited)

**Effect**: VIP users can use unlimited times, 30% off premium plan.

### Scenario 4: Create One-Time Coupon Code

**Form Configuration**:
- Name: Thank You Gift
- Code: THANKS100 (custom)
- Type: Amount Discount
- Discount: $100
- Specified Subscription: Leave blank (all products)
- Start Time: Leave blank
- Expire Time: Leave blank
- Max Usage Count: 1
- Max Usage Count per User: 1

**Effect**: Single-use thank you coupon, first come first served.

## Important Notes

1. **Enable Control**: New coupons default to disabled, must manually enable for users
2. **Code Uniqueness**: Custom codes must be unique, duplicates will fail
3. **Auto-Generation**: Leave code blank for system to auto-generate random code
4. **Product Restriction**: Specified subscriptions apply only to selected products
5. **Time Range**: Start time cannot be in past, expire time can be blank
6. **Usage Count**: 0 or blank means unlimited
7. **User Limit**: Per-user limit prevents abuse
8. **Delete Impact**: Deleting coupons doesn't affect already-used orders

</div>
