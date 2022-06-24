import type {ReccCwcPluginOptions} from '@recc/api/dist/reccCwcPlugin';
import {ReccCwcPlugin} from '@recc/api/dist/reccCwcPlugin';

export default class Recc extends ReccCwcPlugin {
  constructor(options?: ReccCwcPluginOptions) {
    super(window, options ?? {origin: window.origin});
  }

  // TODO: More APIs
}
