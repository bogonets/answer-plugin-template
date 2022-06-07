#!/usr/bin/env bash

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" || exit; pwd)

read -r -p "Please enter a plugin name: answer-plugin-" PLUGIN_NAME

FULLNAME_INIT_FILES=(
  "$ROOT_DIR/black.sh"
  "$ROOT_DIR/build.cython.sh"
  "$ROOT_DIR/clean.sh"
  "$ROOT_DIR/flake8.sh"
  "$ROOT_DIR/isort.cfg"
  "$ROOT_DIR/isort.sh"
  "$ROOT_DIR/mypy.sh"
  "$ROOT_DIR/pytest.ini"
  "$ROOT_DIR/README.md"
  "$ROOT_DIR/setup.cython.py"
  "$ROOT_DIR/setup.py"
  "$ROOT_DIR/uninstall.sh"
  "$ROOT_DIR/upgrade.sh"
  "$ROOT_DIR/fe/package.json"
  "$ROOT_DIR/answer_plugin_template/__init__.py"
  "$ROOT_DIR/answer_plugin_template/plugin/singleton_plugin.py"
  "$ROOT_DIR/test/plugin/test_singleton_plugin.py"
)

for f in ${FULLNAME_INIT_FILES[*]}; do
  sed -i.tmp -e "s/answer\([\._-]\)plugin\([\._-]\)template/answer\\1plugin\\2$PLUGIN_NAME/g" "$f"
done

ROUTER_FILE="$ROOT_DIR/fe/src/router/index.ts"
ROUTER_EXPRESSION="s|^const publicPath = '/plugins/template/';|const publicPath = '/plugins/$PLUGIN_NAME/';|g"
sed -i.tmp -e "$ROUTER_EXPRESSION" "$ROUTER_FILE"

mv -v "$ROOT_DIR/answer_plugin_template" "$ROOT_DIR/answer_plugin_$PLUGIN_NAME"

read -r -p "Remove all *.tmp files? (y/n) " YN
if [[ $YN == 'y' || $YN == 'Y' ]]; then
  find . -name '*.tmp' -exec rm -v {} \;
fi

read -r -p "Remove init-plugin.sh file? (y/n) " YN
if [[ $YN == 'y' || $YN == 'Y' ]]; then
  rm -v "$ROOT_DIR/init-plugin.sh"
fi
