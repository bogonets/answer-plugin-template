#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

"$ROOT_DIR/python" setup.cython.py bdist_wheel

# Remove all '*.c' files.
find "$ROOT_DIR/recc_plugin_annotation" -name "*.c" -exec rm '{}' \;
