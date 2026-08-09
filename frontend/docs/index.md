---
layout: home

tk:
  teekHome: false

hero:
  name: PPanel
  text: Pure Professional Perfect
  tagline: Operate any proxy fleet with a polished, open-source control plane.
  actions:
    - theme: brand
      text: Install PPanel
      link: /guide/installation/
    - theme: alt
      text: Project Overview
      link: /guide/intro
  image:
    src: /logo.svg
    alt: PPanel

features:
  - icon: 🎯
    title: Complete Management
    details: Provision servers, wire nodes, bundle subscriptions, and launch products from one console.
  - icon: 💼
    title: Business Operations
    details: Automate coupons, campaigns, orders, and announcements with built-in workflows.
  - icon: 👥
    title: User Support System
    details: Rich user directory, ticketing, and docs so teams can resolve requests quickly.
  - icon: 📊
    title: Data Analytics
    details: Twelve log channels surface traffic, balance, and commission insights at a glance.
  - icon: 🔧
    title: Flexible Configuration
    details: Payments, auth policies, ads, and system toggles stay configurable without rebuilds.
  - icon: 🚀
    title: Modern Tech Stack
    details: React 19 + TypeScript + TailwindCSS + shadcn/ui deliver a fast, themeable interface.
  - icon: 🛡️
    title: Hardened Backend
    details: Go 1.21+ service built on go-zero, Gin, Gorm, and Asynq keeps gateways stable and private.
  - icon: 🐳
    title: Turnkey Deployments
    details: Official `ppanel/ppanel` Docker images bundle the gateway and backend for amd64/arm64.
---

## Full Stack Overview

PPanel spans three repositories working together:

- **[Frontend](https://github.com/perfect-panel/frontend)** — React 19 UI + VitePress docs for both admin and user portals.
- **[PPanel Server](https://github.com/perfect-panel/server)** — Go 1.21+ APIs focusing on privacy, observability, and multi-protocol orchestration.
- **[ppanel](https://github.com/perfect-panel/ppanel)** — Docker image that ships the compiled gateway plus backend binaries so you can launch everything with one container.

### Frontend experience

- Responsive dashboards, granular permissions, and live counters designed for daily operator workflows.
- Shared component system (shadcn/ui + TailwindCSS) keeps admin and user spaces visually aligned.
- Documentation and guides live side-by-side with the product so teams always deploy from the latest instructions.

### Backend foundation

- Multi-protocol relay for Shadowsocks, V2Ray, Trojan, and Trojan-Go backed by go-zero generated APIs.
- Node lifecycle automation (heartbeat, registration, version checks, rolling updates) to keep edges healthy.
- Business domains such as subscriptions, billing, payments, orders, and tickets mirror what you configure in the UI.
- Privacy-first defaults — user activity logs stay off unless explicitly enabled; configs live in `etc/ppanel.yaml`.
- Flexible delivery: Go binaries per platform, Makefile targets, and CI-published Docker images like `ppanel/ppanel-server:latest`.

### Gateway & deployment

The `ppanel/ppanel` image folds the gateway and backend into one container (amd64 + arm64). Mount `modules/<platform>/etc` from the repo and the UI immediately connects to the bundled services.

::: tip Docker quickstart
```bash
docker pull ppanel/ppanel:latest
docker run -d --name ppanel \
  -p 8080:8080 \
  -v $(pwd)/ppanel-config:/app/etc \
  ppanel/ppanel:latest
```
:::

#### Recommended workflow

1. Copy `modules/<arch>/etc` to a persistent folder (`ppanel-config`) and update `ppanel.yaml` plus secrets.
2. Start with `docker run` for quick trials, then move to the Compose snippet in the repo for auto-restarts.
3. Upgrade by pulling the new tag, restarting the container, and letting the gateway refresh nodes in-place.
4. Troubleshoot with `docker exec -it ppanel /bin/sh` and `docker logs -f ppanel` — everything lives under `/app`.
