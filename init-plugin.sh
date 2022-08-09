#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

read -r -p "Please enter a plugin name: answer-plugin-" PLUGIN_NAME

FULLNAME_INIT_FILES=(
    "$ROOT_DIR/README.md"
    "$ROOT_DIR/fe/package.json"
    "$ROOT_DIR/fe/src/store/storeOptions.ts"
    "$ROOT_DIR/plugin/README.md"
    "$ROOT_DIR/plugin/answer_plugin_template/__init__.py"
    "$ROOT_DIR/plugin/black.sh"
    "$ROOT_DIR/plugin/clean.sh"
    "$ROOT_DIR/plugin/flake8.sh"
    "$ROOT_DIR/plugin/isort.cfg"
    "$ROOT_DIR/plugin/isort.sh"
    "$ROOT_DIR/plugin/mypy.sh"
    "$ROOT_DIR/plugin/pytest.ini"
    "$ROOT_DIR/plugin/setup.cfg"
    "$ROOT_DIR/plugin/uninstall.sh"
    "$ROOT_DIR/upgrade.sh"
)

for f in ${FULLNAME_INIT_FILES[*]}; do
    sed -i.tmp -e "s/answer\([\._-]\)plugin\([\._-]\)template/answer\\1plugin\\2$PLUGIN_NAME/g" "$f"
done

ROUTER_FILE="$ROOT_DIR/fe/package.json"
ROUTER_EXPRESSION="s|\"publicPath\": \"/plugins/template/\"|\"publicPath\": \"/plugins/$PLUGIN_NAME/\"|"
sed -i.tmp -e "$ROUTER_EXPRESSION" "$ROUTER_FILE"

mv -v "$ROOT_DIR/answer_plugin_template" "$ROOT_DIR/answer_plugin_$PLUGIN_NAME"

echo "Remove all *.tmp files ..."
find . -name '*.tmp' -exec rm -v {} \;

read -r -p "Remove init-plugin.sh file? (y/n) " YN
if [[ $YN == 'y' || $YN == 'Y' ]]; then
    rm -v "$ROOT_DIR/init-plugin.sh"
fi
