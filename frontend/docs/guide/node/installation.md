# Node Agent Installation

`ppanel-node` is the lightweight agent each edge server runs to sync routes, heartbeats, and transport keys with the PPanel control plane. This guide covers the fastest install path plus alternative deployments.

## Quick start

```bash
wget -N https://raw.githubusercontent.com/perfect-panel/ppanel-node/master/scripts/install.sh
sudo bash install.sh --api-host https://panel.example.com --server-id 1 --secret-key <SECRET>
```

The script auto-detects your distro/architecture, downloads the latest release, installs geo databases, and sets up the `ppnode` CLI + system service.

### Requirements

- 64-bit Linux (Debian/Ubuntu ≥16, CentOS ≥7, Alpine, Arch, etc.)
- Root access and outbound HTTPS connectivity to `github.com`
- Firewall ports open for the protocols you expose as well as panel callbacks
- Matching **Server ID** + **Secret Key** generated in the PPanel admin console

### Optional flags

- Positional `vX.Y.Z` argument installs a specific tag instead of the latest release.
- `--api-host https://panel.example.com`
- `--server-id <ID>` (matches the record you created under Maintenance → Servers)
- `--secret-key <KEY>`

If the flags are omitted the installer will prompt for the values interactively.

### Service operations

Once installed you can manage the agent with the bundled CLI:

```bash
ppnode status      # current state
ppnode start       # start daemon
ppnode restart     # restart + reload config
ppnode log         # follow logs
ppnode update      # upgrade to latest release
ppnode update v1.2.3
ppnode uninstall
ppnode generate    # regenerate /etc/PPanel-node/config.yml
```

## Installation methods

### Method 1 — One-click installer (recommended)

Use the Quick Start command above or run `sudo bash install.sh` and answer the prompts. Behind the scenes the script:

1. Installs prerequisites (`wget`, `curl`, `tar`, `socat`, cron, etc.).
2. Downloads `ppanel-node-linux-<arch>.zip` for amd64, arm64, or s390x.
3. Extracts to `/usr/local/PPanel-node`, installs `geoip.dat`/`geosite.dat`, and wires the service with systemd/OpenRC.
4. Drops the helper CLI to `/usr/bin/ppnode` and enables auto-start.

### Method 2 — Build from source

1. Install Go 1.21 or newer and enable the JSON v2 experiment:

    ```bash
    export GOEXPERIMENT=jsonv2
    ```

2. Clone the repository and build:

    ```bash
    git clone https://github.com/perfect-panel/ppanel-node.git
    cd ppanel-node
    GOEXPERIMENT=jsonv2 go build -v -o ./ppnode -trimpath -ldflags "-s -w -buildid="
    ```

3. Copy the binary plus geo assets to their runtime locations:

    ```bash
    sudo install -Dm755 ./ppnode /usr/local/PPanel-node/ppnode
    sudo install -Dm644 ./geoip.dat /etc/PPanel-node/geoip.dat
    sudo install -Dm644 ./geosite.dat /etc/PPanel-node/geosite.dat
    ```

4. Create the systemd unit (adapt paths as needed):

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

5. Copy `config.yml` from the repo or create it manually (see the configuration section) and restart the service.

### Method 3 — Docker / container images

The repository ships a `Dockerfile`. You can build and run it on hosts where installing directly is undesirable:

```bash
git clone https://github.com/perfect-panel/ppanel-node.git
cd ppanel-node
docker build -t ppanel-node:latest .
docker run -d --name ppanel-node \
  --net host \
  -v /etc/PPanel-node:/etc/PPanel-node \
  ppanel-node:latest server
```

Recommended bind mounts:

- `/etc/PPanel-node/config.yml` – credentials and API settings.
- `/etc/PPanel-node/geoip.dat` & `/etc/PPanel-node/geosite.dat` – keep them on the host so updates persist.
- `/var/log/ppanel-node` (optional) – collect structured logs outside the container.

## Configure the node

The runtime configuration lives in `/etc/PPanel-node/config.yml`. The installer generates the file with the following structure:

```yaml
Log:
  Level: warn          # debug | info | warn | error
  Output: ""           # empty = stdout, or set a file path
  Access: none         # path for access logs, or "none"

Api:
  ApiHost: https://panel.example.com
  ServerID: 3
  SecretKey: b23d8ee1cfe44d7f
  Timeout: 30
```

After editing the file, restart the service:

```bash
sudo systemctl restart PPanel-node
# or
ppnode restart
```

### Mapping to the panel

1. Create a server entry in the **Maintenance → Servers** page inside the PPanel admin UI.
2. Copy the generated **Server ID** and **Secret Key** into `config.yml`.
3. Ensure the node host can reach the panel’s HTTPS endpoint defined as `ApiHost`.
4. Approve the node once it appears under the panel’s node list (heartbeat should update within ~30 seconds).

## Maintenance

- `ppnode update` keeps configuration/geo files intact while replacing the binary.
- `ppnode update vX.Y.Z` pins a specific release for rollbacks.
- For manual builds, rebuild the target tag, replace `/usr/local/PPanel-node/ppnode`, then `systemctl restart PPanel-node`.

## Troubleshooting

- `ppnode log` or `journalctl -u PPanel-node -f` surfaces runtime logs.
- Validate `/etc/PPanel-node/config.yml`—typos in `ApiHost` or `SecretKey` cause auth failures.
- Ensure the host can reach GitHub (updates) and your panel domain on port 443.
- If the panel lists the node as offline, verify firewall rules allow heartbeats and that NTP is synchronized (`chronyc tracking`).

Need more detail? Review the source at [`github.com/perfect-panel/ppanel-node`](https://github.com/perfect-panel/ppanel-node).
