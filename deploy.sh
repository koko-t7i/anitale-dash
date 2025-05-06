#!/bin/bash
set -euo pipefail

# ----------------------------
# 日志与错误处理
# ----------------------------
log() { echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S'): $*"; }
die() { echo "[ERROR] $*" >&2; exit 1; }

# ----------------------------
# 常量配置
# ----------------------------
project_dir="/home/koko/icode/anitale-dash"
TARGET_DIR="/home/koko/icode/anitale-dash-server"
STAGE_DIR="/home/koko/icode/anitale-dash-server-stage"  # 临时目录
BACKUP_ROOT="/home/koko/icode/backups/anitale-dash-server"
service_blue="anitale-dash-blue"
service_green="anitale-dash-green"
port_blue=7123
port_green=7122

# ----------------------------
# 前置检查
# ----------------------------
log "Checking prerequisites..."
[[ -d "$project_dir" ]]    || die "项目目录不存在: $project_dir"
command -v pnpm >/dev/null 2>&1 || die "pnpm 未安装"
command -v pm2  >/dev/null 2>&1 || die "pm2 未安装"
command -v git  >/dev/null 2>&1 || die "git 未安装"
command -v node >/dev/null 2>&1 || die "node 未安装"

# ----------------------------
# 1. 更新代码 & 构建（全量构建）
# ----------------------------
log "Fetching latest code..."
cd "$project_dir"
# git fetch origin || die "git fetch 失败"
# git reset --hard origin/main || die "git reset 失败"

log "Installing dependencies..."
pnpm install --frozen-lockfile || die "依赖安装失败"

log "Building project..."
pnpm run build || die "构建失败"

# ----------------------------
# 2. 制作临时发布包（stage）
# ----------------------------
log "Preparing staging directory: $STAGE_DIR"
rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR"

# 复制 standalone
[[ -d ".next/standalone" ]] || die "缺少 .next/standalone，构建不完整"
shopt -s dotglob
cp -r .next/standalone/* "$STAGE_DIR/" || die "复制 standalone 失败"

# 复制 public
[[ -d "public" ]] && cp -r public "$STAGE_DIR/public" || die "缺少 public 目录"

# 复制静态资源
mkdir -p "$STAGE_DIR/.next/static"
[[ -d ".next/static" ]] && cp -r .next/static/* "$STAGE_DIR/.next/static/" || die "缺少 .next/static"

log "Staging artifacts prepared."

# ----------------------------
# 3. 在 stage 启动 blue 服务并验证
# ----------------------------
log "Launching blue service from staging..."
# 删除旧的 blue（如果存在）
pm2 delete "$service_blue" >/dev/null 2>&1 || true

PORT=$port_blue pm2 start server.js \
  --name "$service_blue" \
  --cwd "$STAGE_DIR" \
  --env production \
  || die "Blue 服务启动命令失败"

# 等待几秒再检查
sleep 5
if pm2 describe "$service_blue" | grep "online"; then
  log "Blue service is online."
else
  die "Blue service failed to start!"
fi

# ----------------------------
# 4. 备份现网并同步新版本
# ----------------------------
TIMESTAMP=$(date +%Y%m%d%H%M%S)
backup_dir="$BACKUP_ROOT/$TIMESTAMP"
log "Backing up current production to $backup_dir"
mkdir -p "$BACKUP_ROOT"
if [[ -d "$TARGET_DIR" ]]; then
  cp -a "$TARGET_DIR" "$backup_dir" || die "备份失败"
  # 保留最近 3 个备份
  ls -1dt "$BACKUP_ROOT"/* | tail -n +4 | xargs rm -rf || true
fi

log "Synchronizing staging to production..."
mkdir -p "$TARGET_DIR" || die "创建 $TARGET_DIR 失败"
rsync -a --delete "$STAGE_DIR"/ "$TARGET_DIR"/ || die "rsync 同步到生产目录失败"

# ----------------------------
# 5. 重载 green 并清理 blue
# ----------------------------
log "Reloading green service..."
pm2 reload "$service_green" || die "Green 服务重载失败"

sleep 3
if pm2 describe "$service_green" | grep "online"; then
  log "Green service is online."
else
  die "Green service failed after reload!"
fi

log "Cleaning up blue service..."
sleep 2
pm2 delete "$service_blue" || log "WARN: 删除 blue 服务失败"

log "Deployment completed successfully."
