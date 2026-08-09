#!/bin/bash

#######################################################
# Docker & Docker Compose Installation Script
# Support: Ubuntu/Debian, CentOS/RHEL
# Usage: curl -fsSL https://ppanel.dev/scripts/en/install-docker.sh | bash
#######################################################

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run with root privileges"
        log_info "Please use: sudo bash $0"
        exit 1
    fi
}

# Detect operating system
detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$ID
        VER=$VERSION_ID
    else
        log_error "Unable to detect operating system"
        exit 1
    fi

    log_info "Detected system: $OS $VER"
}

# Check if Docker is already installed
check_docker_installed() {
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version | cut -d ' ' -f3 | cut -d ',' -f1)
        log_warn "Docker is already installed (Version: $DOCKER_VERSION)"
        read -p "Do you want to reinstall? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Skipping Docker installation"
            return 0
        fi
    fi
    return 1
}

# Install Docker - Ubuntu/Debian
install_docker_debian() {
    log_info "Installing Docker on Ubuntu/Debian..."

    # Update package index
    apt-get update

    # Install dependencies
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # Add Docker's official GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/$OS/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Set up repository
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    log_info "Docker installation completed"
}

# Install Docker - CentOS/RHEL
install_docker_centos() {
    log_info "Installing Docker on CentOS/RHEL..."

    # Install yum-utils
    yum install -y yum-utils

    # Add Docker repository
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

    # Install Docker Engine
    yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    log_info "Docker installation completed"
}

# Start Docker service
start_docker() {
    log_info "Starting Docker service..."

    systemctl start docker
    systemctl enable docker

    log_info "Docker service started and enabled at boot"
}

# Configure Docker group (optional)
configure_docker_group() {
    log_info "Configuring Docker group..."

    if ! getent group docker > /dev/null; then
        groupadd docker
    fi

    if [[ -n "$SUDO_USER" ]]; then
        usermod -aG docker "$SUDO_USER"
        log_info "User $SUDO_USER has been added to docker group"
        log_warn "Please log out and log back in for group permissions to take effect"
    fi
}

# Verify installation
verify_installation() {
    log_info "Verifying Docker installation..."

    # Check Docker version
    if docker --version &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        log_info "✓ $DOCKER_VERSION"
    else
        log_error "Docker installation failed"
        exit 1
    fi

    # Check Docker Compose version
    if docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
        log_info "✓ $COMPOSE_VERSION"
    else
        log_error "Docker Compose installation failed"
        exit 1
    fi

    # Run test container
    log_info "Running test container..."
    if docker run --rm hello-world &> /dev/null; then
        log_info "✓ Docker is working correctly"
    else
        log_error "Docker test failed"
        exit 1
    fi
}

# Main function
main() {
    echo "========================================"
    echo "  Docker & Docker Compose Installer"
    echo "========================================"
    echo ""

    check_root
    detect_os

    if check_docker_installed; then
        verify_installation
        exit 0
    fi

    case $OS in
        ubuntu|debian)
            install_docker_debian
            ;;
        centos|rhel|rocky|almalinux)
            install_docker_centos
            ;;
        *)
            log_error "Unsupported operating system: $OS"
            log_info "Supported systems: Ubuntu, Debian, CentOS, RHEL, Rocky Linux, AlmaLinux"
            exit 1
            ;;
    esac

    start_docker
    configure_docker_group
    verify_installation

    echo ""
    log_info "========================================"
    log_info "Docker and Docker Compose installed successfully!"
    log_info "========================================"
    log_info "Docker version: $(docker --version)"
    log_info "Docker Compose version: $(docker compose version)"
    echo ""
    log_info "Next step: Install PPanel"
    log_info "Run: curl -fsSL https://ppanel.dev/scripts/en/install-ppanel.sh | bash"
}

main "$@"
