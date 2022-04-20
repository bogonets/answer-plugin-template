# -*- coding: utf-8 -*-

__version__ = "1.0.0"

DEFAULT_VERSION_MAJOR = int(__version__.split(".")[0])
DEFAULT_VERSION_MINOR = int(__version__.split(".")[1])
DEFAULT_VERSION_PATCH = int(__version__.split(".")[2])


def on_create(context, **kwargs) -> None:
    pass


async def on_open() -> None:
    pass


async def on_close() -> None:
    pass


def on_destroy() -> None:
    pass


def on_routes():
    return []


if __name__ == "__main__":
    pass
