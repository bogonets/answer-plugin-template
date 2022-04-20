#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

"$ROOT_DIR/python" -m black \
    --check \
    --diff \
    --color \
    --exclude '(/\.git|/\.venv)' \
    "$ROOT_DIR/recc_plugin_annotation/" \
    "$ROOT_DIR/test/"
