---
title: API Reference
outline: false
aside: false
---

# API Reference

The API reference now uses Scalar (embedded via iframe) to render the OpenAPI files hosted in [`public/swagger`](https://github.com/perfect-panel/ppanel-docs/tree/main/public/swagger). Each schema has its own dedicated page:

- [Common Service](./common) — shared authentication/utilities used by both user and admin portals.
- [User Service](./user) — subscriptions, orders, tickets, profile management.
- [Admin Service](./admin) — dashboard, maintenance, commerce, logging modules.
- [Gateway](./gateway) — version checks, heartbeats, registration, and update orchestration hooks for edge services.

Pick a service from the sidebar to view the interactive API explorer.
