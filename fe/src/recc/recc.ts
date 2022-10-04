import type {ReccCwcClientOptions} from '@recc/api/dist/reccCwcClient';
import {ReccCwcClient} from '@recc/api/dist/reccCwcClient';

export default class Recc extends ReccCwcClient {
  constructor(options?: ReccCwcClientOptions) {
    super(window, options ?? {origin: window.origin});
  }

  // TODO: More APIs
}
