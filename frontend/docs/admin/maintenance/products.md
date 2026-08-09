# Product Management

The Product Management module creates and manages subscription packages, which is the core of business operations.

## Overview

### Product List

View and manage all product packages:

- **Product Name**: Package display name
- **Product Type**: Period/Traffic/Pay-as-you-go
- **Price**: Product price and discount price
- **Traffic Quota**: Total/Monthly traffic
- **Validity**: Package duration (month/quarter/year)
- **Node Groups**: Included node groups
- **Status**: Active/Inactive/Sold out
- **Sales**: Product sales quantity

### Create Product

Create new subscription package:

#### Basic Info

- **Product Name**: Package name users see
- **Description**: Detailed product description
- **Category**: Basic/Advanced/Premium
- **Sort Order**: Product display order

#### Pricing

- **Original Price**: Product original price
- **Sale Price**: Actual selling price
- **Discount**: Discount percentage
- **Currency**: CNY/USD, etc.
- **Billing Cycle**: Monthly/Quarterly/Yearly

#### Traffic Config

- **Total Traffic**: Package total traffic quota
- **Traffic Cycle**: One-time/Monthly reset
- **Traffic Rate**: Traffic billing multiplier
- **Overage**: Handling for traffic overage

#### Duration

- **Validity**: Package usage period
- **Billing Cycle**: Monthly/Quarterly/Yearly
- **Auto-renewal**: Support auto-renewal
- **Renewal Discount**: Discount on renewal

#### Node Config

- **Included Groups**: Select node groups in package
- **Device Limit**: Simultaneous device connection limit
- **Speed Limit**: Per-user speed cap
- **Available Regions**: Geographic restrictions

#### Advanced Options

- **Inventory**: Set product stock quantity
- **Purchase Limit**: Per-person purchase limit
- **New User Only**: Only new users can buy
- **Trial Settings**: Provide free trial

### Edit Product

Modify existing product configuration:

- Adjust price and discount
- Update traffic quota
- Modify node range
- Change product status

::: warning Note
Product config changes don't affect existing users, only new orders.
:::

### Delete Product

Confirm before deleting:

- Are users currently using it
- Are there pending orders
- Should historical data be kept

Recommend deactivating first, then delete after confirmation.

## Product Categories

### By Period

#### Monthly

- High flexibility for short-term users
- Relatively higher price
- Easy for users to try service

#### Quarterly

- Moderate price and duration
- Balance flexibility and discount
- Suitable for most users

#### Yearly

- Large discount
- For long-term users
- Reduce user churn

#### Lifetime

- One-time payment for permanent use
- High price but good value
- For loyal users

### By Traffic

#### Traffic Package

- Fixed traffic quota
- Stop when used up
- For users with clear needs

#### Unlimited

- No traffic limit
- May limit speed
- For heavy users

#### Pay-as-you-go

- Pay for what you use
- Flexible but potentially costly
- For occasional users

### By Tier

#### Basic

- Affordable price
- Basic node groups
- For light usage

#### Advanced

- Good value
- More node options
- For daily use

#### Premium

- Full node access
- Highest speed and stability
- For professional users

## Pricing Strategy

### Pricing Principles

- **Cost-based**: Cover server and bandwidth costs
- **Competition-based**: Reference industry pricing
- **Value-based**: Price by value provided
- **Psychological**: Use pricing psychology

### Promotion Strategy

#### Limited Time

- Holiday promotions
- Anniversary sales
- New product launch discounts

#### Coupons

- Spend threshold coupons
- Discount coupons
- New user coupons

#### Member Discounts

- VIP user exclusive discounts
- Cumulative purchase rebates
- Referral rewards

#### Bundle Packages

- Multi-product combo discounts
- Package upgrade discounts
- Renewal discounts

## Product Display

### Product Page

Optimize display to improve conversion:

- **Clear Title**: Highlight features
- **Detailed Description**: Explain advantages
- **Price Comparison**: Show discount magnitude
- **User Reviews**: Show real feedback
- **Purchase Guide**: Clear buy button

### Product Comparison

Help users choose suitable package:

- **Comparison Table**: Side-by-side comparison
- **Recommendation Badge**: Mark popular/recommended
- **Differentiation**: Highlight differences
- **Use Cases**: Explain suitable scenarios

## Product Analysis

### Sales Data

Analyze product sales:

- **Sales Stats**: Product sales quantity
- **Revenue Stats**: Revenue per product
- **Conversion Rate**: Visit to purchase
- **User Profile**: Buyer characteristics

### Optimization

Optimize products based on data:

- **Price Adjustment**: Optimize pricing
- **Config Optimization**: Adjust traffic and nodes
- **Promotion Optimization**: Improve promotions
- **Experience Optimization**: Enhance purchase flow

## Inventory Management

### Inventory Settings

- **Stock Quantity**: Set product inventory
- **Stock Alert**: Low stock reminder
- **Restocking**: Auto-restock rules

### Inventory Monitoring

- **Real-time Stock**: View current inventory
- **Stock Flow**: Inventory change records
- **Sales Forecast**: Predict inventory needs

## Best Practices

- Offer multiple price tiers for different needs
- Set clear product features and advantages
- Regularly analyze sales data to optimize
- Keep product info updated
- Use promotions reasonably to boost sales
- Collect user feedback for improvement

## Next Steps

- [Order Management](/admin/commerce/orders) - Process product orders
- [Coupon Management](/admin/commerce/coupons) - Create promotions
- [Marketing Management](/admin/commerce/marketing) - Promote products
