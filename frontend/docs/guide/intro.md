# Introduction

Welcome to PPanel! This is a pure, professional, and perfect open-source proxy panel tool designed to provide users with a complete management solution.

## What is PPanel?

PPanel is a modern proxy panel system that uses a separated frontend-backend architecture, providing complete user management, subscription services, order management, node management, and more. Whether you're an individual or enterprise user, PPanel can meet your needs.

## Core Features

- **🎯 Complete Management**: Server management, node configuration, subscription system, product management and more
- **💼 Business Operations**: Order management, coupon system, marketing campaigns, announcement publishing
- **👥 User Support System**: User management, ticket system, documentation center for comprehensive user service
- **📊 Data Analytics**: 12 types of logs with comprehensive traffic, balance, commission data analysis
- **🔧 Flexible Configuration**: Payment config, authentication control, ad management and flexible system options
- **🚀 Modern Tech Stack**: Built with React 19 + TypeScript + TailwindCSS + shadcn/ui

## Terminology

Some of PPanel's terminology differs from other panel systems. To ensure accurate understanding and avoid confusion, please familiarize yourself with the following terms before reading the documentation:

### User Frontend
The interface provided to end users, through which users interact with the system. You can customize or refactor this interface according to your needs to achieve site personalization.

### Admin Frontend
The interface for administrator operations, responsible for managing the system, users, and data. You can customize or refactor this interface according to your management needs.

### Backend Server
PPanel's API layer that handles all data interactions with the frontend, responsible for executing business logic and providing data services.

### Node Server
Responsible for communication between PPanel's backend server and various nodes (landing points), ensuring network node connectivity and service stability.

### Client
The application program users use to connect to the system, typically referring to user device software or applications, responsible for establishing connections with the system and using related services.

## Project Architecture

PPanel uses Monorepo architecture for unified management and maintenance:

### Frontend Applications
- **apps/admin**: Admin panel application providing complete backend management features
- **apps/user**: User-facing application providing service interface for end users

### Shared Packages
- **packages/ui**: Shared UI component library containing all reusable UI components
- **packages/typescript-config**: Unified TypeScript configuration

### Tech Stack
- **Framework**: React 19 + TypeScript
- **Router**: TanStack Router
- **State Management**: Zustand
- **Styling**: TailwindCSS 4.0
- **UI Components**: shadcn/ui
- **Build Tools**: Vite + Turbo
- **Code Standards**: Biome
- **Git Standards**: Lefthook + Gitmoji

## Key Features

### Maintenance
- Server Management
- Node Management
- Subscribe Configuration
- Product Management

### Commerce
- Order Management
- Coupon Management
- Marketing Management
- Announcement Management

### Users & Support
- User Management
- Ticket System
- Document Management

### System
- System Configuration
- Authentication Control
- Payment Configuration
- ADS Configuration

### Logs & Analytics
- Complete operation logs
- Traffic statistics
- Financial data tracking

## Next Steps

- [Installation](/guide/installation/) - Learn how to deploy PPanel
- [Configuration](/guide/configuration) - Configure your PPanel instance
- [Admin Panel](/admin/dashboard) - Start using admin features
