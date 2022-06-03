import ReccCwcPlugin from '@recc/api/dist/reccCwcPlugin';

declare module 'vue/types/vue' {
  interface Vue {
    $recc: ReccCwcPlugin;
  }
}
