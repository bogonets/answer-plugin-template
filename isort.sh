#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

"$ROOT_DIR/python" -m isort \
    --settings-path "$ROOT_DIR/isort.cfg" \
    "$ROOT_DIR/setup.cython.py" \
    "$ROOT_DIR/setup.py" \
    "$ROOT_DIR/recc_plugin_annotation" \
    "$ROOT_DIR/test"
