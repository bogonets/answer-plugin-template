# -*- coding: utf-8 -*-

from typing import Callable, List, Tuple

from yaml_translator import TranslatorLangMapper

from answer_plugin_template import translations

t = TranslatorLangMapper.from_module_dir(translations)

__version__ = "0.0.1"
"""
The plug-in version must be specified. Use the semantic versioning specification.
e.g. `MAJOR.MINOR.PATCH`
"""

__doc__ = "Documentation"
"""
The plugin's documentation string.
"""

__recc_spec__ = {
    "permissions": [
        "answer.plugin.template.view",
        "answer.plugin.template.edit",
    ],
    "menus": {
        "project": [
            {
                "icon": "mdi-home",
                "name": "home",
                "path": "/home",
                "permission": "answer.plugin.template.view",
                "translations": t("menu.home"),
            },
            {
                "icon": "mdi-help-circle",
                "name": "about",
                "path": "/about",
                "permission": "answer.plugin.template.view",
                "translations": t("menu.about"),
            },
        ]
    },
    "www": [
        (r"(.*)", r"\1"),
        "index.html",
    ],
}
"""
A specification dictionary for the recc plugin.
"""


def on_create(context) -> None:
    """
    Called immediately after the application launch process completes.
    """
    pass


def on_destroy() -> None:
    """
    Called just before the application exit process.
    """
    pass


async def on_open() -> None:
    """
    An asynchronous constructor event that runs in the main event loop.
    """
    pass


async def on_close() -> None:
    """
    An asynchronous destructor event that runs in the main event loop.
    """
    pass


async def on_create_group(uid: int) -> None:
    """
    Called when a group is created.
    """
    pass


async def on_delete_group(uid: int) -> None:
    """
    Called when a group is deleted.
    """
    pass


async def on_create_project(uid: int) -> None:
    """
    Called when a project is created.
    """
    pass


async def on_delete_project(uid: int) -> None:
    """
    Called when a project is deleted.
    """
    pass


def on_routes() -> List[Tuple[str, str, Callable]]:
    """
    It should return a routing table that can accept HTTP requests.
    """
    return []


if __name__ == "__main__":
    # If you need to run it standalone.
    pass
