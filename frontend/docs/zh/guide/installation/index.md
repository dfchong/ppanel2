# 安装概览

PPanel 支持多种部署方式，以适应不同的需求和环境。选择最适合你需求的部署方式。

## 部署方式

### Docker 部署（推荐）

最简单、最可靠的部署方式。Docker 确保环境一致性并简化更新流程。

- **[Docker Compose](/zh/guide/installation/docker-compose)** - 生产环境推荐，更好的管理方式

### 传统部署

- **[二进制部署](/zh/guide/installation/binary)** - 使用预编译二进制文件和 systemd 服务部署

### 高级部署

- **[源码部署](/zh/guide/installation/from-source)** - 从源码构建并运行 PPanel

## 系统要求

### 最低配置
- **操作系统**: Linux (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- **CPU**: 1 核心
- **内存**: 512MB RAM
- **存储**: 1GB 可用磁盘空间

### 推荐配置
- **CPU**: 2+ 核心
- **内存**: 2GB+ RAM
- **存储**: 5GB+ 可用磁盘空间

## 前置条件

所有部署方式都需要：
- 基于 Linux 的操作系统
- 基本的命令行知识
- 网络访问以下载软件包/镜像

具体的前置条件因部署方式而异 - 请查看各个指南了解详情。

## 快速开始

对于大多数用户，我们推荐从 Docker Compose 开始：

1. [安装 Docker 和 Docker Compose](/zh/guide/installation/docker-compose#前置条件)
2. [下载配置文件](/zh/guide/installation/docker-compose#下载配置)
3. [启动服务](/zh/guide/installation/docker-compose#启动服务)

## 需要帮助？

- 查看我们的[故障排除指南](/zh/guide/troubleshooting)
- 访问 [GitHub Issues](https://github.com/perfect-panel/ppanel/issues)
- 加入我们的社区讨论
