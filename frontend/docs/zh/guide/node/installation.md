# 节点端安装

`ppanel-node` 是部署在边缘服务器上的轻量代理守护进程，基于 `xray-core`，负责同步路由、订阅、心跳与密钥。本指南提供最快速的一键安装方式，并补充源码与容器方案。

## 快速开始

```bash
wget -N https://raw.githubusercontent.com/perfect-panel/ppanel-node/master/scripts/install.sh
sudo bash install.sh --api-host https://panel.example.com --server-id 1 --secret-key <SECRET>
```

脚本会自动识别系统/架构、拉取最新版、安装 geo 数据，并配置 `ppnode` CLI 与系统服务。

### 环境要求

- 64 位 Linux（Debian/Ubuntu ≥16、CentOS ≥7、Alpine、Arch 等）
- 拥有 root 权限，且可访问 `github.com`
- 防火墙需放通对外协议端口及访问面板的 443 端口
- 面板后台已生成匹配的 **Server ID** 与 **Secret Key**

### 可选参数

- 位置参数 `vX.Y.Z`：安装指定 tag。
- `--api-host https://panel.example.com`
- `--server-id <ID>`（对应运维→服务器 管理页面中的记录）
- `--secret-key <KEY>`

若未传入参数，脚本会在安装过程中交互式询问。

### 服务管理

安装完成后可通过 CLI 管理：

```bash
ppnode status      # 查看状态
ppnode start       # 启动
ppnode restart     # 重启 + 重新加载配置
ppnode log         # 查看日志
ppnode update      # 升级至最新版本
ppnode update v1.2 # 安装指定版本
ppnode uninstall   # 卸载
ppnode generate    # 重新生成 /etc/PPanel-node/config.yml
```

## 安装方式

### 方式一：一键脚本（推荐）

执行上方快速开始命令或运行 `sudo bash install.sh` 并按提示填写信息。脚本包含以下步骤：

1. 根据发行版安装依赖（`wget`、`curl`、`tar`、`socat`、cron 等）。
2. 下载 `ppanel-node-linux-<arch>.zip`（支持 amd64/arm64/s390x）。
3. 解压到 `/usr/local/PPanel-node`，安装 `geoip.dat`、`geosite.dat`，配置系统服务。
4. 安装 `/usr/bin/ppnode` 管理脚本并设置开机自启。

### 方式二：从源码构建

1. 安装 Go 1.21+，并启用 JSON v2 实验特性：

    ```bash
    export GOEXPERIMENT=jsonv2
    ```

2. 克隆仓库并编译：

    ```bash
    git clone https://github.com/perfect-panel/ppanel-node.git
    cd ppanel-node
    GOEXPERIMENT=jsonv2 go build -v -o ./ppnode -trimpath -ldflags "-s -w -buildid="
    ```

3. 复制二进制与 geo 数据：

    ```bash
    sudo install -Dm755 ./ppnode /usr/local/PPanel-node/ppnode
    sudo install -Dm644 ./geoip.dat /etc/PPanel-node/geoip.dat
    sudo install -Dm644 ./geosite.dat /etc/PPanel-node/geosite.dat
    ```

4. 创建 systemd 服务：

    ```bash
    sudo tee /etc/systemd/system/PPanel-node.service <<'EOF'
    [Unit]
    Description=PPanel Node
    After=network.target

    [Service]
    Type=simple
    ExecStart=/usr/local/PPanel-node/ppnode server
    Restart=always
    RestartSec=10

    [Install]
    WantedBy=multi-user.target
    EOF
    sudo systemctl daemon-reload
    sudo systemctl enable --now PPanel-node
    ```

5. 复制仓库中的 `config.yml` 或手动创建（见配置章节），最后重启服务。

### 方式三：容器化部署

仓库自带 `Dockerfile`，可在不方便直接安装的宿主机上运行：

```bash
git clone https://github.com/perfect-panel/ppanel-node.git
cd ppanel-node
docker build -t ppanel-node:latest .
docker run -d --name ppanel-node \
  --net host \
  -v /etc/PPanel-node:/etc/PPanel-node \
  ppanel-node:latest server
```

建议挂载的目录：

- `/etc/PPanel-node/config.yml` —— 保存 API/密钥配置。
- `/etc/PPanel-node/geoip.dat` 与 `/etc/PPanel-node/geosite.dat` —— 持久化 Geo 数据文件。
- `/var/log/ppanel-node`（可选）—— 在宿主机收集日志。

## 配置节点

运行时配置位于 `/etc/PPanel-node/config.yml`，结构如下：

```yaml
Log:
  Level: warn      # debug | info | warn | error
  Output: ""       # 为空代表 stdout，也可以写入文件
  Access: none     # 访问日志路径，none 为关闭

Api:
  ApiHost: https://panel.example.com
  ServerID: 3
  SecretKey: b23d8ee1cfe44d7f
  Timeout: 30
```

修改完成后重启服务：

```bash
sudo systemctl restart PPanel-node
# 或
ppnode restart
```

### 与面板的映射关系

1. 在 **运维管理 → 服务器管理** 中创建记录，获取对应的 Server ID 与 Secret Key。
2. 将上述信息填入 `config.yml`，`ApiHost` 必须是面板的公网可访问地址。
3. 确保节点能够访问面板 443 端口，且面板允许节点 IP 回连。
4. 节点上报后会在面板中显示为在线，通常 30 秒内即可看到心跳。

## 升级与回滚

- `ppnode update` 仅替换二进制，保留配置与 geo 文件。
- `ppnode update vX.Y.Z` 可按版本号回滚。
- 源码部署时，重新构建目标 tag，替换 `/usr/local/PPanel-node/ppnode` 并 `systemctl restart PPanel-node`。

## 故障排查

- `ppnode log` 或 `journalctl -u PPanel-node -f` 查看运行日志。
- 确认 `/etc/PPanel-node/config.yml` 中 `ApiHost`、`SecretKey` 填写正确。
- 保证服务器可访问 GitHub（更新）与面板域名的 443 端口。
- 面板显示离线时检查防火墙是否放行心跳、系统时间是否同步（`chronyc tracking`）。

更多细节可参阅源仓库：[`github.com/perfect-panel/ppanel-node`](https://github.com/perfect-panel/ppanel-node)。
