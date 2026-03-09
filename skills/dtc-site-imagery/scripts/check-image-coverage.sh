#!/usr/bin/env bash
set -euo pipefail

repo_root="${1:-$(pwd)}"
cd "$repo_root"

echo "== stale editorial references =="
rg -n '/editorial/' app components data lib -g '!public/**' || true

echo
echo "== generated asset count =="
find public/generated -type f | wc -l

echo
echo "== generated assets =="
find public/generated -type f | sort
