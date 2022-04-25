# -*- coding: utf-8 -*-

from typing import Optional
from recc.core.context import Context


class Plugin:
    def __init__(self, context: Context, **kwargs: str):
        self.context = context
        self.kwargs = kwargs

    async def on_open(self) -> None:
        pass

    async def on_close(self) -> None:
        pass

    def on_routes(self):
        assert self
        return []


_plugin: Optional[Plugin] = None


def create_global_plugin(context: Context, **kwargs: str) -> None:
    global _plugin
    assert _plugin is None
    _plugin = Plugin(context, **kwargs)


def destroy_global_plugin() -> None:
    global _plugin
    assert _plugin is not None
    del _plugin


def get_global_plugin() -> Plugin:
    global _plugin
    assert _plugin is not None
    return _plugin
