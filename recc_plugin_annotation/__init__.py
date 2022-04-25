# -*- coding: utf-8 -*-

from recc.core.context import Context
from recc_plugin_annotation.plugin import (
    create_global_plugin,
    destroy_global_plugin,
    get_global_plugin,
)

__version__ = "0.0.1"
"""
The plug-in version must be specified.
"""

VERSION_MAJOR = int(__version__.split(".")[0])
VERSION_MINOR = int(__version__.split(".")[1])
VERSION_PATCH = int(__version__.split(".")[2])


def on_create(context: Context, **kwargs: str) -> None:
    """
    Called immediately after the application launch process completes.
    """
    create_global_plugin(context, **kwargs)


def on_destroy() -> None:
    """
    Called just before the application exit process.
    """
    destroy_global_plugin()


async def on_open() -> None:
    """
    An asynchronous constructor event that runs in the main event loop.
    """
    await get_global_plugin().on_open()


async def on_close() -> None:
    """
    An asynchronous destructor event that runs in the main event loop.
    """
    await get_global_plugin().on_close()


def on_routes():
    """
    It should return a routing table that can accept HTTP requests.
    """
    get_global_plugin().on_routes()


if __name__ == "__main__":
    # If you need to run it standalone.
    pass
elif __name__ == "__recc__":
    # The plugin's entry point name is `__recc__`.
    pass
