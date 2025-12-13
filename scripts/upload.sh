#!/usr/bin/env bash
set -euo pipefail

SRC="la-construction"
OUT="/tmp/${SRC}.tar.bz2"
CONTAINERS_DIR="/home/containers"

tar \
  --exclude="data/redis-data" \
  --exclude="node_modules" \
  -C "$CONTAINERS_DIR" \
  -cjvf "$OUT" \
  "$SRC"

echo "$OUT"


sftp home <<EOF
put $OUT
EOF

rm "$OUT"