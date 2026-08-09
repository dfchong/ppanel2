#!/usr/bin/env bash
# ============================================================================
# 顺序应用 ppanel2 k3s 清单并等待后端就绪
#   范围：namespace + Secret + 后端 Deployment/Service（镜像 dfchong/ppanel2:0.1）
#   云隧道 cloudflared 属后续步骤（需先创建 Tunnel 凭据），不在此脚本内。
# 用法：./04-apply.sh
# ============================================================================
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
NS="ppanel2"

echo ">>> 应用清单（namespace: ${NS}）"
kubectl apply -f "$DIR/01-namespace.yaml"
kubectl apply -f "$DIR/02-ppanel-secret.yaml"
kubectl apply -f "$DIR/02-ppanel-cors-configmap.yaml"
kubectl apply -f "$DIR/03-ppanel-deployment.yaml"

echo ">>> 等待 ppanel-server 就绪"
kubectl -n "${NS}" rollout status deploy/ppanel-server --timeout=300s

echo ">>> 当前状态"
kubectl -n "${NS}" get pods,svc

echo ">>> 完成。若 Pod 未就绪，请查看日志：kubectl -n ${NS} logs deploy/ppanel-server"
