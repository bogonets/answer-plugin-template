# -*- coding: utf-8 -*-

import os
import re
from typing import List
from setuptools import setup, find_packages
from setuptools.command.build_py import build_py
from Cython.Build import cythonize

PLUGIN_NAME = "recc_plugin_annotation"

SETUP_PATH = os.path.abspath(__file__)
SETUP_DIR = os.path.dirname(SETUP_PATH)
PACKAGE_DIR = os.path.join(SETUP_DIR, PLUGIN_NAME)
INIT_PY = os.path.join(PACKAGE_DIR, "__init__.py")
README_PATH = os.path.join(SETUP_DIR, "README.md")
REQUIREMENTS = os.path.join(SETUP_DIR, "requirements.txt")
VERSION_REGEX = r"^__version__ = ['\"]([^'\"]*)['\"]"

SOURCE_FILTERS = (
    re.compile(r".*__init__\.py$"),
    re.compile(r".*__main__\.py$"),
)


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


def ignore_filter(sources: List[str], filters=SOURCE_FILTERS) -> List[str]:
    result = sources
    for f in filters:
        result = list(filter(lambda x: f.match(x) is None, result))
    return result


def children_files(path: str):
    result = []
    for parent, _, files in os.walk(path):
        for name in files:
            result.append(os.path.join(parent, name))
    return result


def match_files(path: str, regexp=r".*") -> List[str]:
    p = re.compile(regexp)
    return [f for f in children_files(path) if p.match(f) is not None]


def strip_prefix(sources: List[str], prefix: str) -> List[str]:
    result = list()
    for s in sources:
        if s.startswith(prefix):
            result.append(s[len(prefix):])
        else:
            result.append(s)
    return result


def is_match_filter(source, filters=SOURCE_FILTERS):
    for f in filters:
        if f.match(source) is not None:
            return True
    return False


class NoPythonBuildPy(build_py):
    def find_package_modules(self, package, package_dir):
        # ext_suffix = sysconfig.get_config_var("EXT_SUFFIX")
        modules = super().find_package_modules(package, package_dir)
        filtered_modules = []
        for pkg, mod, filepath in modules:
            if is_match_filter(filepath):
                filtered_modules.append((pkg, mod, filepath))
        return filtered_modules


def setup_main():
    name = PLUGIN_NAME
    version = read_version(INIT_PY)
    requirements = read_requirements(REQUIREMENTS)
    packages = find_packages(where=SETUP_DIR, exclude=("test*",))

    www_datas = children_files(os.path.join(PACKAGE_DIR, "www"))
    www_datas = ignore_filter(www_datas)
    www_datas = strip_prefix(www_datas, PACKAGE_DIR)
    www_datas = strip_prefix(www_datas, "/")

    files = match_files(path=PACKAGE_DIR, regexp=r".*\.py$")
    files = ignore_filter(files)

    compiler_directives = {"language_level": 3}
    cython_modules = cythonize(
        module_list=files, compiler_directives=compiler_directives
    )
    for ext in cython_modules:
        ext.extra_compile_args = ["-g0"]

    setup(
        name=name,
        version=version,
        packages=packages,
        ext_modules=cython_modules,
        cmdclass={"build_py": NoPythonBuildPy},  # noqa
        package_dir={name: name},
        package_data={name: www_datas},
        install_requires=requirements,
    )


if __name__ == "__main__":
    setup_main()
