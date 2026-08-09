# ============================================================================
# ppanel-server 自建镜像（不依赖官方镜像，方便日后修改源码）
# 基于仓库 backend/Dockerfile 重构：
#   - 多阶段：golang:alpine 构建 + scratch 运行时
#   - 内置 GeoLite2-City.mmdb，运行期不依赖外网（仓库 .dockerignore 排除了 cache/）
#   - 保留 TARGETARCH / VERSION / CHANNEL 版本注入（pkg/constant.*）
#
# 构建方式（见 build.sh）：
#   docker build -f deploy/backend/Dockerfile backend/
# ============================================================================
FROM golang:alpine AS builder

LABEL stage=gobuilder

ARG TARGETARCH
ARG VERSION=unknown
ARG CHANNEL=dev
# GeoLite2 数据库下载源（可替换为内网镜像源加速）
ARG GEODB_URL=https://raw.githubusercontent.com/adysec/IP_database/main/geolite/GeoLite2-City.mmdb
ENV CGO_ENABLED=0 GOOS=linux GOARCH=${TARGETARCH}

# 合并 apk 命令减少层体积；curl 用于下载 mmdb
RUN apk update --no-cache && apk add --no-cache tzdata ca-certificates curl

WORKDIR /build

# 先复制 go.mod / go.sum 以利用 Docker 构建缓存
COPY go.mod go.sum ./
RUN go mod download

# 复制其余源码
COPY . .

# 编译二进制，注入版本信息
RUN BUILD_TIME=$(date -u +"%Y-%m-%d %H:%M:%S") && \
    go build -ldflags="-s -w -X 'github.com/perfect-panel/server/pkg/constant.Version=${VERSION}' -X 'github.com/perfect-panel/server/pkg/constant.BuildTime=${BUILD_TIME}' -X 'github.com/perfect-panel/server/pkg/constant.Channel=${CHANNEL}'" -o /app/ppanel main.go

# 内置 GeoLite2 数据库：下载失败则构建失败，避免带病镜像
# （后端启动时若文件缺失会尝试外网下载，失败才 panic；内置后运行期零外网依赖）
RUN mkdir -p /app/cache && \
    curl -fsSL -o /app/cache/GeoLite2-City.mmdb "${GEODB_URL}" && \
    test -s /app/cache/GeoLite2-City.mmdb

# ----------------------------------------------------------------------------
# 最终最小镜像
# ----------------------------------------------------------------------------
FROM scratch

# CA 证书与时区数据
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo/Asia/Shanghai /usr/share/zoneinfo/Asia/Shanghai

ENV TZ=Asia/Shanghai

WORKDIR /app

COPY --from=builder /app/ppanel /app/ppanel
COPY --from=builder /build/etc /app/etc
# mmdb 已随镜像内置（后端工作目录 /app/cache/GeoLite2-City.mmdb）
COPY --from=builder /app/cache/GeoLite2-City.mmdb /app/cache/GeoLite2-City.mmdb

EXPOSE 8080

ENTRYPOINT ["/app/ppanel"]
CMD ["run", "--config", "etc/ppanel.yaml"]
