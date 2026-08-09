# Installation Overview

PPanel supports multiple deployment methods to suit different needs and environments. Choose the method that best fits your requirements.

## Deployment Methods

### Docker Deployment (Recommended)

The easiest and most reliable way to deploy PPanel. Docker ensures consistent environments and simplifies updates.

- **[Docker Compose](/guide/installation/docker-compose)** - Production-ready deployment with better management

### Traditional Deployment

- **[Binary Deployment](/guide/installation/binary)** - Deploy using pre-built binaries with systemd service

### Advanced Deployment

- **[Kubernetes](/guide/installation/kubernetes)** - Deploy PPanel in Kubernetes clusters for high availability
- **[From Source](/guide/installation/from-source)** - Build and run PPanel from source code

## System Requirements

### Minimum Requirements
- **Operating System**: Linux (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- **CPU**: 1 core
- **Memory**: 512MB RAM
- **Storage**: 1GB available disk space

### Recommended Requirements
- **CPU**: 2+ cores
- **Memory**: 2GB+ RAM
- **Storage**: 5GB+ available disk space

## Prerequisites

All deployment methods require:
- Linux-based operating system
- Basic command line knowledge
- Network access for downloading packages/images

Specific prerequisites vary by deployment method - check the individual guides for details.

## Quick Start

For most users, we recommend starting with Docker Compose:

1. [Install Docker and Docker Compose](/guide/installation/docker-compose#prerequisites)
2. [Download configuration files](/guide/installation/docker-compose#download-configuration)
3. [Start the services](/guide/installation/docker-compose#start-services)

## Need Help?

- Check our [Troubleshooting Guide](/guide/troubleshooting)
- Visit [GitHub Issues](https://github.com/perfect-panel/ppanel/issues)
- Join our community discussions
