#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)
VERSION=$(cat "$ROOT_DIR/VERSION")

BACKEND_PATH="$ROOT_DIR/answer_plugin_template/__init__.py"
FRONTEND_PATH="$ROOT_DIR/fe/package.json"

sed -i.tmp -e "s/__version__ = \".*\"/__version__ = \"$VERSION\"/" "$BACKEND_PATH"
sed -i.tmp -e "s/  \"version\": \".*\",/  \"version\": \"$VERSION\",/" "$FRONTEND_PATH"

rm "$BACKEND_PATH.tmp"
rm "$FRONTEND_PATH.tmp"
