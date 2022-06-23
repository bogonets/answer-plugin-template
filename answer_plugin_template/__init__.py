# -*- coding: utf-8 -*-

from typing import Callable, List, Tuple

from recc.package.package_utils import get_module_directory
from recc.translations.translator import TranslatorLangMapper

from answer_plugin_template import translations
from answer_plugin_template.plugin.singleton_plugin import SingletonPlugin

t = TranslatorLangMapper.from_dir(get_module_directory(translations))

__version__ = "0.0.1"
"""
The plug-in version must be specified. Use the semantic versioning specification.
e.g. `MAJOR.MINOR.PATCH`
"""

__doc__ = "Answer Plugin Template Project"
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
    SingletonPlugin.create(context)


def on_destroy() -> None:
    """
    Called just before the application exit process.
    """
    SingletonPlugin.destroy()


async def on_open() -> None:
    """
    An asynchronous constructor event that runs in the main event loop.
    """
    await SingletonPlugin.get().on_open()


async def on_close() -> None:
    """
    An asynchronous destructor event that runs in the main event loop.
    """
    await SingletonPlugin.get().on_close()


async def on_create_group(uid: int) -> None:
    """
    Called when a group is created.
    """
    await SingletonPlugin.get().on_create_group(uid)


async def on_delete_group(uid: int) -> None:
    """
    Called when a group is deleted.
    """
    await SingletonPlugin.get().on_delete_group(uid)


async def on_create_project(uid: int) -> None:
    """
    Called when a project is created.
    """
    await SingletonPlugin.get().on_create_project(uid)


async def on_delete_project(uid: int) -> None:
    """
    Called when a project is deleted.
    """
    await SingletonPlugin.get().on_delete_project(uid)


def on_routes() -> List[Tuple[str, str, Callable]]:
    """
    It should return a routing table that can accept HTTP requests.
    """
    return SingletonPlugin.get().on_routes()


if __name__ == "__main__":
    # If you need to run it standalone.
    pass
