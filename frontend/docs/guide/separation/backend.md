# Backend Separation Deployment

This guide will help you independently deploy the PPanel backend service, suitable for front-end and back-end separation deployment scenarios.

## Overview

Backend separation deployment allows you to deploy the PPanel backend service on an independent server to provide API services for frontend applications. This deployment method has the following advantages:

- 🚀 Independently scale backend service performance
- 🔒 Better security isolation
- 🌐 Support multiple frontend instances connecting to the same backend
- 🛠️ Facilitate independent maintenance and upgrades of backend services

## System Requirements

### Minimum Configuration
- CPU: 1 core
- Memory: 1 GB
- Storage: 10 GB
- OS: Linux (Ubuntu 20.04+, Debian 11+, CentOS 8+ recommended)

### Recommended Configuration
- CPU: 2+ cores
- Memory: 2+ GB
- Storage: 20+ GB

## Deployment Methods

### Method 1: Docker Deployment (Recommended)

#### 1. Install Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. Create Configuration File

Create backend config file `config.yaml`:

```yaml
# Database configuration
database:
  type: mysql
  host: localhost
  port: 3306
  username: ppanel
  password: your_password
  database: ppanel

# Redis configuration
redis:
  host: localhost
  port: 6379
  password: ""
  db: 0

# Server configuration
server:
  host: 0.0.0.0
  port: 8080

# CORS configuration (Important: allow frontend domain access)
cors:
  allow_origins:
    - "https://your-frontend-domain.com"
    - "http://localhost:3000"  # Development environment
  allow_methods:
    - GET
    - POST
    - PUT
    - DELETE
    - OPTIONS
  allow_headers:
    - "*"

# JWT configuration
jwt:
  secret: "your-secret-key"
  expire: 7200  # 2 hours

# API configuration
api:
  prefix: "/api"
  version: "v1"
```

#### 3. Prepare MySQL Database

```bash
# Run MySQL with Docker
docker run -d \
  --name ppanel-mysql \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=ppanel \
  -e MYSQL_USER=ppanel \
  -e MYSQL_PASSWORD=your_password \
  -p 3306:3306 \
  -v ppanel-mysql-data:/var/lib/mysql \
  mysql:8.0

# Wait for MySQL to start
sleep 10
```

#### 4. Prepare Redis

```bash
# Run Redis with Docker
docker run -d \
  --name ppanel-redis \
  -p 6379:6379 \
  -v ppanel-redis-data:/data \
  redis:7-alpine
```

#### 5. Run Backend Service

```bash
# Pull backend image
docker pull ppanel/ppanel:latest

# Run backend container
docker run -d \
  --name ppanel-backend \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --link ppanel-mysql:mysql \
  --link ppanel-redis:redis \
  ppanel/ppanel:latest
```

#### 6. Initialize Database

```bash
# Execute database migration
docker exec ppanel-backend ./ppanel migrate
```

### Method 2: Binary Deployment

#### 1. Download Backend Program

```bash
# Download latest version
wget https://github.com/perfect-panel/ppanel/releases/latest/download/ppanel-linux-amd64.tar.gz

# Extract
tar -xzf ppanel-linux-amd64.tar.gz
cd ppanel

# Grant execute permission
chmod +x ppanel
```

#### 2. Configure Backend Service

Create config file `config.yaml` (same content as Docker deployment method).

#### 3. Install and Configure MySQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server -y

# Create database and user
sudo mysql <<EOF
CREATE DATABASE ppanel;
CREATE USER 'ppanel'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ppanel.* TO 'ppanel'@'localhost';
FLUSH PRIVILEGES;
EOF
```

#### 4. Install and Configure Redis

```bash
# Ubuntu/Debian
sudo apt install redis-server -y
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### 5. Initialize Database

```bash
# Execute database migration
./ppanel migrate
```

#### 6. Create systemd Service

Create service file `/etc/systemd/system/ppanel.service`:

```ini
[Unit]
Description=PPanel Backend Service
After=network.target mysql.service redis.service

[Service]
Type=simple
User=ppanel
WorkingDirectory=/opt/ppanel
ExecStart=/opt/ppanel/ppanel server
Restart=on-failure
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Start service:

```bash
# Create dedicated user
sudo useradd -r -s /bin/false ppanel

# Move files to installation directory
sudo mkdir -p /opt/ppanel
sudo mv ppanel config.yaml /opt/ppanel/
sudo chown -R ppanel:ppanel /opt/ppanel

# Start service
sudo systemctl daemon-reload
sudo systemctl start ppanel
sudo systemctl enable ppanel

# Check service status
sudo systemctl status ppanel
```

## Configure Reverse Proxy

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    # HTTPS redirect (recommended to configure SSL certificate)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeout configuration
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# HTTPS configuration example
# server {
#     listen 443 ssl http2;
#     server_name api.your-domain.com;
#
#     ssl_certificate /path/to/cert.pem;
#     ssl_certificate_key /path/to/key.pem;
#
#     location / {
#         proxy_pass http://127.0.0.1:8080;
#         # ... other configs same as above
#     }
# }
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy Configuration

```caddy
api.your-domain.com {
    reverse_proxy localhost:8080
}
```

## Verify Deployment

### Health Check

```bash
# Check if backend service is running
curl http://localhost:8080/api/health

# Expected output
# {"status":"ok","version":"1.0.0"}
```

### Test API

```bash
# Test public API
curl http://localhost:8080/api/v1/ping

# Expected output
# {"message":"pong"}
```

## Environment Variable Configuration

Besides config file, you can also use environment variables:

```bash
# Database configuration
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=ppanel
export DB_PASSWORD=your_password
export DB_NAME=ppanel

# Redis configuration
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_PASSWORD=""

# JWT secret
export JWT_SECRET=your-secret-key

# Server port
export SERVER_PORT=8080
```

Using environment variables with Docker:

```bash
docker run -d \
  --name ppanel-backend \
  -p 8080:8080 \
  -e DB_HOST=mysql \
  -e DB_USER=ppanel \
  -e DB_PASSWORD=your_password \
  -e REDIS_HOST=redis \
  --link ppanel-mysql:mysql \
  --link ppanel-redis:redis \
  ppanel/ppanel:latest
```

## Security Recommendations

1. **Use Strong Passwords**: Set strong passwords for database and JWT secret
2. **Configure Firewall**: Only open necessary ports (e.g., 80, 443)
3. **Enable HTTPS**: Use SSL/TLS certificates to encrypt communication
4. **CORS Configuration**: Only allow trusted frontend domains
5. **Regular Backups**: Regularly backup database and config files
6. **Monitor Logs**: Regularly check application and system logs

## Troubleshooting

### Service Failed to Start

```bash
# View service logs
sudo journalctl -u ppanel -n 50 --no-pager

# Docker view logs
docker logs ppanel-backend
```

### Database Connection Failed

```bash
# Test MySQL connection
mysql -h localhost -u ppanel -p -e "SELECT 1;"

# Check MySQL service status
sudo systemctl status mysql
```

### Redis Connection Failed

```bash
# Test Redis connection
redis-cli ping

# Check Redis service status
sudo systemctl status redis-server
```

### CORS Error

Ensure frontend domain is correctly configured in `config.yaml`:

```yaml
cors:
  allow_origins:
    - "https://your-frontend-domain.com"
```

## Performance Optimization

### Database Optimization

```sql
-- Create necessary indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at);
```

### Redis Cache Configuration

```yaml
redis:
  # Enable cache
  cache_enabled: true
  # Cache expiration time (seconds)
  cache_ttl: 3600
```

### Application Layer Optimization

```yaml
# Enable Gzip compression
server:
  gzip: true

# Adjust concurrent connections
server:
  max_connections: 1000
```

## Upgrade Guide

### Docker Upgrade

```bash
# Pull latest image
docker pull ppanel/ppanel:latest

# Stop old container
docker stop ppanel-backend

# Backup data
docker exec ppanel-mysql mysqldump -u ppanel -p ppanel > backup.sql

# Remove old container
docker rm ppanel-backend

# Run new container
docker run -d \
  --name ppanel-backend \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --link ppanel-mysql:mysql \
  --link ppanel-redis:redis \
  ppanel/ppanel:latest

# Execute database migration
docker exec ppanel-backend ./ppanel migrate
```

### Binary Upgrade

```bash
# Stop service
sudo systemctl stop ppanel

# Backup old version
sudo cp /opt/ppanel/ppanel /opt/ppanel/ppanel.backup

# Download new version
wget https://github.com/perfect-panel/ppanel/releases/latest/download/ppanel-linux-amd64.tar.gz
tar -xzf ppanel-linux-amd64.tar.gz

# Replace file
sudo mv ppanel /opt/ppanel/
sudo chown ppanel:ppanel /opt/ppanel/ppanel

# Execute database migration
cd /opt/ppanel
sudo -u ppanel ./ppanel migrate

# Start service
sudo systemctl start ppanel
```

## Next Steps

- [Frontend Separation Deployment](./frontend.md) - Deploy frontend application
- [Node Agent Installation](../node/installation.md) - Deploy node service
- [API Documentation](/api/reference) - View complete API documentation
