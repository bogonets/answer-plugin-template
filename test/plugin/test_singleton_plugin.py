# -*- coding: utf-8 -*-

from unittest import TestCase, main
from recc_plugin_annotation.plugin.singleton_plugin import SingletonPlugin


class SingletonPluginTestCase(TestCase):
    def test_attribute_error(self):
        with self.assertRaises(AttributeError):
            SingletonPlugin.get()

    def test_create_and_destroy(self):
        self.assertIsNotNone(SingletonPlugin.create(object()))  # noqa
        self.assertIsNotNone(SingletonPlugin.get())

        SingletonPlugin.destroy()
        with self.assertRaises(AttributeError):
            SingletonPlugin.get()

    def test_same_instance(self):
        self.assertIsNotNone(SingletonPlugin.create(object()))  # noqa
        instance1 = SingletonPlugin.get()
        instance2 = SingletonPlugin.get()
        self.assertEqual(instance1, instance2)
        SingletonPlugin.destroy()


if __name__ == "__main__":
    main()
