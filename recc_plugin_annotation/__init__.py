# -*- coding: utf-8 -*-

from typing import Callable, List, Tuple

from recc.core.context import Context

from recc_plugin_annotation.plugin.singleton_plugin import SingletonPlugin

__version__ = "0.0.1"
"""
The plug-in version must be specified. Use the semantic versioning specification.
e.g. `MAJOR.MINOR.PATCH`
"""

__doc__ = "Annotation tool plugin for machine learning"
"""
The plugin's documentation string.
"""

__recc_spec__ = {
    "dependencies": [],
    "group": {},
    "project": {
        "menu": [
            {
                "icon": "mdi-image-edit",
                "path": "/",
            }
        ],
    },
    "www": [
        (".*", "index.html"),
    ],
}
"""
A specification dictionary for the recc plugin.
"""


def on_create(context: Context) -> None:
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
