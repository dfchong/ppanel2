#!/bin/bash

#######################################################
# Docker & Docker Compose 安装脚本
# 支持: Ubuntu/Debian, CentOS/RHEL
# 用法: curl -fsSL https://ppanel.dev/scripts/zh/install-docker.sh | bash
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

# 检查是否为 root 用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本必须以 root 权限运行"
        log_info "请使用: sudo bash $0"
        exit 1
    fi
}

# 检测系统类型
detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$ID
        VER=$VERSION_ID
    else
        log_error "无法检测操作系统类型"
        exit 1
    fi

    log_info "检测到系统: $OS $VER"
}

# 检查 Docker 是否已安装
check_docker_installed() {
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version | cut -d ' ' -f3 | cut -d ',' -f1)
        log_warn "Docker 已安装 (版本: $DOCKER_VERSION)"
        read -p "是否重新安装? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "跳过 Docker 安装"
            return 0
        fi
    fi
    return 1
}

# 安装 Docker - Ubuntu/Debian
install_docker_debian() {
    log_info "开始在 Ubuntu/Debian 上安装 Docker..."

    # 更新包索引
    apt-get update

    # 安装依赖
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # 添加 Docker 官方 GPG 密钥
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/$OS/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # 设置仓库
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # 安装 Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    log_info "Docker 安装完成"
}

# 安装 Docker - CentOS/RHEL
install_docker_centos() {
    log_info "开始在 CentOS/RHEL 上安装 Docker..."

    # 安装 yum-utils
    yum install -y yum-utils

    # 添加 Docker 仓库
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

    # 安装 Docker Engine
    yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    log_info "Docker 安装完成"
}

# 启动 Docker 服务
start_docker() {
    log_info "启动 Docker 服务..."

    systemctl start docker
    systemctl enable docker

    log_info "Docker 服务已启动并设置为开机自启"
}

# 配置 Docker 用户组（可选）
configure_docker_group() {
    log_info "配置 Docker 用户组..."

    if ! getent group docker > /dev/null; then
        groupadd docker
    fi

    if [[ -n "$SUDO_USER" ]]; then
        usermod -aG docker "$SUDO_USER"
        log_info "用户 $SUDO_USER 已添加到 docker 组"
        log_warn "请注销并重新登录以使组权限生效"
    fi
}

# 验证安装
verify_installation() {
    log_info "验证 Docker 安装..."

    # 检查 Docker 版本
    if docker --version &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        log_info "✓ $DOCKER_VERSION"
    else
        log_error "Docker 安装失败"
        exit 1
    fi

    # 检查 Docker Compose 版本
    if docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
        log_info "✓ $COMPOSE_VERSION"
    else
        log_error "Docker Compose 安装失败"
        exit 1
    fi

    # 运行测试容器
    log_info "运行测试容器..."
    if docker run --rm hello-world &> /dev/null; then
        log_info "✓ Docker 运行正常"
    else
        log_error "Docker 运行测试失败"
        exit 1
    fi
}

# 主函数
main() {
    echo "========================================"
    echo "  Docker & Docker Compose 安装脚本"
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
            log_error "不支持的操作系统: $OS"
            log_info "支持的系统: Ubuntu, Debian, CentOS, RHEL, Rocky Linux, AlmaLinux"
            exit 1
            ;;
    esac

    start_docker
    configure_docker_group
    verify_installation

    echo ""
    log_info "========================================"
    log_info "Docker 和 Docker Compose 安装完成!"
    log_info "========================================"
    log_info "Docker 版本: $(docker --version)"
    log_info "Docker Compose 版本: $(docker compose version)"
    echo ""
    log_info "下一步: 安装 PPanel"
    log_info "运行: curl -fsSL https://ppanel.dev/scripts/install-ppanel.sh | bash"
}

main "$@"
