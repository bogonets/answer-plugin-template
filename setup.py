# -*- coding: utf-8 -*-

import os
import re
from typing import Iterable, List

from setuptools import find_packages, setup

PACKAGE_NAME = "answer_plugin_template"

SCRIPT_PATH = os.path.abspath(__file__)
SCRIPT_DIR = os.path.dirname(SCRIPT_PATH)
PACKAGE_DIR = os.path.join(SCRIPT_DIR, PACKAGE_NAME)
PACKAGE_INIT_PY = os.path.join(PACKAGE_DIR, "__init__.py")
README_PATH = os.path.join(SCRIPT_DIR, "README.md")
REQUIREMENTS = os.path.join(SCRIPT_DIR, "requirements.txt")
VERSION_REGEX = r"^__version__ = ['\"]([^'\"]*)['\"]"

SPECIAL_DUNDER_FILE_PATTERNS = (
    re.compile(r".*__init__\.py$"),
    re.compile(r".*__main__\.py$"),
)
PYTHON_CACHE_DIRECTORY_PATTERN = re.compile(r"(^|.*/)?__pycache__($|/.*)")
PACKAGE_DATA_IGNORE_PATTERNS = (
    SPECIAL_DUNDER_FILE_PATTERNS + (PYTHON_CACHE_DIRECTORY_PATTERN,)
)


def read_file(path: str, encoding="utf-8") -> str:
    with open(path, encoding=encoding) as f:
        return f.read()


def read_version(path: str, encoding="utf-8") -> str:
    content = read_file(path, encoding)
    matches = re.search(VERSION_REGEX, content, re.M)
    if not matches:
        raise RuntimeError(f"Unable to find version string in {PACKAGE_INIT_PY}")
    return matches.group(1)


def read_requirements(path: str, encoding="utf-8") -> List[str]:
    content = read_file(path, encoding)
    lines = content.split("\n")
    lines = map(lambda x: x.strip(), lines)
    lines = filter(lambda x: x and x[0] != "#", lines)
    return list(lines)


def filter_ignore(sources: List[str], patterns: Iterable[re.Pattern]) -> List[str]:
    result = sources
    for p in patterns:
        result = list(filter(lambda x: p.match(x) is None, result))
    return result


def children_files(path: str) -> List[str]:
    result = []
    for parent, _, files in os.walk(path):
        for name in files:
            result.append(os.path.join(parent, name))
    return result


def strip_prefix(sources: List[str], prefix: str) -> List[str]:
    result = list()
    for s in sources:
        if s.startswith(prefix):
            result.append(s[len(prefix):])
        else:
            result.append(s)
    return result


def get_package_data(base_dir: str, sub_dirs: List[str]) -> List[str]:
    result = list()
    for sub in sub_dirs:
        step0 = children_files(os.path.join(base_dir, sub))
        step1 = filter_ignore(step0, PACKAGE_DATA_IGNORE_PATTERNS)
        step2 = strip_prefix(step1, base_dir)
        step3 = strip_prefix(step2, "/")
        result += step3
    return result


def setup_main():
    name = PACKAGE_NAME
    version = read_version(PACKAGE_INIT_PY)
    requirements = read_requirements(REQUIREMENTS)
    packages = find_packages(where=SCRIPT_DIR, exclude=("test*",))
    package_data = get_package_data(PACKAGE_DIR, ["translations", "www"])

    setup(
        name=name,
        version=version,
        packages=packages,
        package_dir={name: name},
        package_data={name: package_data},
        install_requires=requirements,
    )


if __name__ == "__main__":
    setup_main()
