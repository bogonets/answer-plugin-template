# -*- coding: utf-8 -*-

from recc_plugin_annotation.plugin.plugin import Plugin


class SingletonPlugin:

    __singleton_instance__: Plugin

    @classmethod
    def create(cls, context) -> Plugin:
        cls.__singleton_instance__ = Plugin(context)
        return cls.__singleton_instance__

    @classmethod
    def destroy(cls) -> None:
        del cls.__singleton_instance__

    @classmethod
    def get(cls) -> Plugin:
        return cls.__singleton_instance__
