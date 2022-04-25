# -*- coding: utf-8 -*-

import os
import re
from typing import List
from setuptools import setup, find_packages

PLUGIN_NAME = "recc_plugin_annotation"

SETUP_PATH = os.path.abspath(__file__)
SETUP_DIR = os.path.dirname(SETUP_PATH)
PACKAGE_DIR = os.path.join(SETUP_DIR, PLUGIN_NAME)
INIT_PY = os.path.join(PACKAGE_DIR, "__init__.py")
README_PATH = os.path.join(SETUP_DIR, "README.md")
REQUIREMENTS = os.path.join(SETUP_DIR, "requirements.txt")
VERSION_REGEX = r"^__version__ = ['\"]([^'\"]*)['\"]"


def read_file(path: str, encoding="utf-8") -> str:
    with open(path, encoding=encoding) as f:
        return f.read()


def read_version(path: str, encoding="utf-8") -> str:
    content = read_file(path, encoding)
    matches = re.search(VERSION_REGEX, content, re.M)
    if not matches:
        raise RuntimeError(f"Unable to find version string in {INIT_PY}")
    return matches.group(1)


def read_requirements(path: str, encoding="utf-8") -> List[str]:
    content = read_file(path, encoding)
    lines = content.split("\n")
    lines = map(lambda x: x.strip(), lines)
    lines = filter(lambda x: x and x[0] != "#", lines)
    return list(lines)


def setup_main():
    name = PLUGIN_NAME
    version = read_version(INIT_PY)
    requirements = read_requirements(REQUIREMENTS)
    packages = find_packages(where=SETUP_DIR, exclude=("test*",))

    setup(
        name=name,
        version=version,
        packages=packages,
        package_dir={name: name},
        install_requires=requirements,
    )


if __name__ == "__main__":
    setup_main()
