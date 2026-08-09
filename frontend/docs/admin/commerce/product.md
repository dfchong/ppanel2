<div v-pre>

# Product Management

Manage subscription plan products in the system, including pricing, traffic quotas, and node permissions. Products are the basic units that users purchase.

## Table Column Description

### Show
Switch button to control whether the product displays on the frontend. When off, users cannot see this product.

### Sell
Switch button to control whether the product is available for purchase. Can display without selling (announcement mode).

### Name
Product plan name.

### Unit Price
Displays price and billing cycle, format like `$10/Month`.

### Replacement
Promotional price or one-time purchase price.

### Traffic
Traffic quota per cycle, 0 displays as "Unlimited".

### Device Limit
Simultaneous device connection limit, 0 displays as "Unlimited".

### Inventory
Remaining quantity available for sale, 0 displays as "Unlimited".

### Quota
Total sales limit, 0 displays as "Unlimited".

### Language
Language restriction for the product, used for multilingual sites.

### Sold
Quantity sold statistics.

## Table Operations

### Edit
Opens side drawer form to modify product information.

### Delete
Deletes product (requires confirmation), products with existing subscriptions may not be deletable.

### Copy
Quickly duplicates product to create new plan, automatically set to not showing and not selling.

### Batch Delete
Deletes multiple selected products.

### Drag & Drop Sort
Drag product rows to adjust display order, affects frontend display order.

## Product Form

Form contains three tabs:

### Basic Tab

**Name and Language**:
- **Name** (Required) - Product plan name
- **Language** (Optional) - Language restriction, e.g. `zh-CN` or `en`

**Traffic and Limits**:
- **Traffic** - Traffic quota per cycle (GB), 0 = unlimited
- **Speed Limit** - Bandwidth limit (Mbps), 0 = no limit
- **Device Limit** - Simultaneous online devices, 0 = unlimited

**Inventory and Quota**:
- **Inventory** - Remaining quantity for sale, 0 = unlimited
- **Quota** - Total sales limit, 0 = unlimited

**Product Description** (JSON Editor):
```json
{
  "description": "Product description text",
  "features": [
    {
      "type": "default",
      "icon": "uil:shield-check",
      "label": "Feature description"
    }
  ]
}
```

### Pricing Tab

**Basic Pricing**:
- **Unit Price** (Required) - Base price
- **Billing Cycle** (Required) - Options:
  - NoLimit (No time limit)
  - Year
  - Month
  - Day
  - Hour
  - Minute
- **Replacement** - Promotional price
- **Reset Cycle** - Traffic reset method:
  - No reset
  - Reset on 1st of month
  - Monthly reset
  - Annual reset

**Bulk Discounts**:
Dynamic array supporting multiple discount tiers:
- **Quantity** - Number of billing cycles
- **Discount** - Discount percentage (1-100%)
- **Price** - Discounted price

Auto-calculation: Modify any two values, the third auto-calculates.

**Deduction Settings**:
- **Deduction Ratio** - Node traffic multiplier (0-100%), leave blank for auto
- **Renewal Reset** - Switch, whether to reset traffic on renewal
- **Purchase with Discount** - Switch, whether to allow coupon usage

### Servers Tab

**Node Tag Selection**:
Accordion-style list showing all tags and their nodes:
- Check tags to automatically include all nodes under that tag
- Shows node count
- Expand to view node details (name, address, protocol)

**Individual Node Selection**:
Select nodes without tags:
- Check nodes individually
- Shows node name, address:port, protocol

## Usage Scenarios

### Scenario 1: Create Basic Monthly Plan

**Basic Tab**:
- Name: Standard Monthly
- Traffic: 100 GB
- Speed Limit: 0 (no limit)
- Device Limit: 3
- Inventory: 0 (unlimited)

**Pricing Tab**:
- Unit Price: 30
- Billing Cycle: Month
- Reset Cycle: Monthly reset
- Bulk Discounts:
  - 3 months, 10% discount, $81
  - 6 months, 15% discount, $153
  - 12 months, 20% discount, $288

**Servers Tab**:
- Check "Basic Nodes" tag

### Scenario 2: Create Traffic Package

**Basic Tab**:
- Name: 500GB Traffic Pack
- Traffic: 500 GB
- Device Limit: 0 (unlimited)

**Pricing Tab**:
- Unit Price: 50
- Billing Cycle: NoLimit
- Reset Cycle: No reset
- Renewal Reset: Off

**Servers Tab**:
- Check all high-speed node tags

### Scenario 3: Create Premium Annual Plan

**Basic Tab**:
- Name: Premium Annual
- Traffic: 0 (unlimited)
- Speed Limit: 200 Mbps
- Device Limit: 10

**Pricing Tab**:
- Unit Price: 300
- Billing Cycle: Year
- Reset Cycle: Monthly reset
- Renewal Reset: On

**Servers Tab**:
- Check all node tags

## Important Notes

1. **Display Control**: New products default to not showing and not selling, must manually enable
2. **Node Configuration**: Must configure nodes, otherwise users cannot use
3. **Bulk Discounts**: After modifying unit price or cycle, discount prices auto-recalculate
4. **Inventory Quota**: 0 means unlimited, non-zero limits sales quantity
5. **Language Restriction**: Leave blank for all languages
6. **Drag Sort**: Sorting saves immediately and affects frontend display
7. **Copy Function**: Copied products don't auto-publish
8. **Sold Products**: Modifying sold product configurations affects existing subscriptions

</div>