export const DEFAULT_PERSIST_KEY = 'answer.plugin.template';
export const DEFAULT_STRICT = process.env.NODE_ENV !== 'production';

export interface StoreOptions {
  key?: string;
  strict?: boolean;
  silent?: boolean;
}
