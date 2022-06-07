#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

rm -rf \
    "$ROOT_DIR/build/" \
    "$ROOT_DIR/dist/" \
    "$ROOT_DIR/answer_plugin_template.egg-info/"

# Remove all '*.c' files.
find "$ROOT_DIR/answer_plugin_template" -name "*.c" -exec rm '{}' \;
