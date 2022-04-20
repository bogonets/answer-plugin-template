#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

"$ROOT_DIR/python" -m mypy \
    --config-file="${ROOT_DIR}/mypy.ini" \
    "$ROOT_DIR/recc_plugin_annotation/" \
    "$ROOT_DIR/test/"
