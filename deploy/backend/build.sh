#!/usr/bin/env bash
# ============================================================================
# 构建并推送自建 ppanel-server 镜像
#
# 用法示例：
#   REGISTRY=registry.example.com/ppanel/ppanel-server TAG=v1.14.0 ./build.sh
#   PLATFORM=linux/arm64 ./build.sh   # k3s 节点为 arm64 时
#   BUILD_TOOL=buildah ./build.sh     # 无 docker 时自动 fallback，也可显式指定
#
# 环境变量：
#   REGISTRY   镜像仓库地址（默认 registry.example.com/ppanel/ppanel-server）
#   TAG        版本号（默认取 git describe --tags，取不到则 dev）
#   PLATFORM   构建平台（默认 linux/amd64）
#   CHANNEL    渠道（默认 release）
#   BUILD_TOOL 构建工具（自动探测 docker|buildah，可显式指定）
#   NETWORK    构建网络（默认 host；受限环境缺 netavark 时 host 可绕过）
#   GOPROXY    Go 模块代理（默认 https://goproxy.cn,direct）
# ============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"        # 仓库根目录
BUILD_DIR="$ROOT/backend"                          # 后端源码目录（构建上下文）
DOCKERFILE="$(cd "$(dirname "$0")" && pwd)/Dockerfile"

REGISTRY="${REGISTRY:-registry.example.com/ppanel/ppanel-server}"
TAG="${TAG:-$(git -C "$ROOT" describe --tags --always 2>/dev/null || echo dev)}"
PLATFORM="${PLATFORM:-linux/amd64}"
CHANNEL="${CHANNEL:-release}"
NETWORK="${NETWORK:-host}"
# 国内构建默认使用 goproxy.cn；忽略系统默认注入的 proxy.golang.org
# （该镜像源在国内常返回 403）。如需自定义代理，可显式设置 GOPROXY 覆盖。
GOPROXY="${GOPROXY:-https://goproxy.cn,direct}"
if [ "${GOPROXY}" = "https://proxy.golang.org,direct" ]; then
  GOPROXY="https://goproxy.cn,direct"
fi
IMAGE="${REGISTRY}:${TAG}"

# ---- 构建工具探测：优先 docker，无则 buildah ----
if [ -n "${BUILD_TOOL:-}" ]; then
  TOOL="$BUILD_TOOL"
else
  if command -v docker >/dev/null 2>&1; then
    TOOL="docker"
  elif command -v buildah >/dev/null 2>&1; then
    TOOL="buildah"
  else
    echo "错误：未找到 docker 或 buildah，请安装其一"; exit 1
  fi
fi
echo ">>> 使用构建工具：${TOOL}"

# ---- buildah 在非 root 下的 userns 处理 ----
# rootless buildah 依赖 newuidmap/newgidmap 的 setgid 位做 UID/GID 映射，
# 受限环境（如容器/沙箱）下会失败（lchown ... Operation not permitted）。
# 若当前非 root 且 sudo 免密可用，自动改用 rootful 模式。
BUILDAH_BIN="buildah"
if [ "$TOOL" = "buildah" ] && [ "$(id -u)" != "0" ]; then
  if command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
    echo ">>> 当前用户非 root，改用 rootful buildah（sudo -n buildah）以规避 userns 限制"
    BUILDAH_BIN="sudo -n buildah"
  fi
fi
# 推送凭据：rootless 用已登录 auth.json；rootful 需显式 --creds
REGISTRY_USER="${REGISTRY_USER:-dfchong}"
REGISTRY_TOKEN="${REGISTRY_TOKEN:-}"

echo ">>> [1/3] 校验后端目录"
[ -f "$BUILD_DIR/go.mod" ] || { echo "错误：未找到 $BUILD_DIR/go.mod，请确认仓库结构"; exit 1; }
[ -f "$DOCKERFILE" ] || { echo "错误：未找到 Dockerfile $DOCKERFILE"; exit 1; }

echo ">>> [2/3] 构建镜像 ${IMAGE} (${PLATFORM})"
if [ "$TOOL" = "docker" ]; then
  docker build \
    --platform "${PLATFORM}" \
    --build-arg VERSION="${TAG}" \
    --build-arg CHANNEL="${CHANNEL}" \
    -t "${IMAGE}" \
    -f "${DOCKERFILE}" \
    "${BUILD_DIR}"
else
  # buildah：--format docker 保证与 registry/运行时兼容；rootless/rootful 均走 vfs 驱动。
  # rootful 存储可能同时存在 overlay/vfs，storage-driver 是 buildah 全局参数，须在子命令前指定。
  # 受限环境 /sys/fs/cgroup 只读导致 crun 无法启用 controllers；改用 --isolation chroot
  # （RUN 步骤经 chroot 直接执行，不依赖 OCI runtime 与 cgroup）。
  $BUILDAH_BIN --storage-driver "${STORAGE_DRIVER:-vfs}" build --format docker \
    --isolation "${ISOLATION:-chroot}" \
    --network "${NETWORK}" \
    --build-arg VERSION="${TAG}" \
    --build-arg CHANNEL="${CHANNEL}" \
    --build-arg GOPROXY="${GOPROXY}" \
    -t "${IMAGE}" \
    -f "${DOCKERFILE}" \
    "${BUILD_DIR}"
fi

echo ">>> [3/3] 推送镜像 ${IMAGE}"
if [ "$TOOL" = "docker" ]; then
  docker push "${IMAGE}"
else
  # 全局 storage-driver 参数同样须用于 push，避免多 driver 报错
  if [ -n "${REGISTRY_TOKEN}" ]; then
    $BUILDAH_BIN --storage-driver "${STORAGE_DRIVER:-vfs}" push --format docker \
      --creds "${REGISTRY_USER}:${REGISTRY_TOKEN}" \
      "${IMAGE}" "docker://${IMAGE}"
  else
    $BUILDAH_BIN --storage-driver "${STORAGE_DRIVER:-vfs}" push --format docker \
      "${IMAGE}" "docker://${IMAGE}"
  fi
fi

echo ">>> 完成：${IMAGE}"
