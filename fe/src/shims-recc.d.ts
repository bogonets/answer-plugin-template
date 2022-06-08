import {Recc} from '@/recc/recc';

declare module 'vue/types/vue' {
  interface Vue {
    $recc: Recc;
  }
}
