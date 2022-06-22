<i18n lang="yaml">
en:
  title: 'ANSWER PLUGIN'

ko:
  title: '엔서 플러그인'
</i18n>

<template>
  <hello-answer
    :title="title"
    :username="username"
    @click:move="onClickMove"
    @click:toast="onClickToast"
    @click:fullscreen="onClickFullscreen"
  ></hello-answer>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import HelloAnswer from '@/components/HelloAnswer.vue';

@Component({
  components: {
    HelloAnswer,
  },
})
export default class HomeView extends Vue {
  title = '';
  username = '';

  created() {
    this.title = this.$t('title').toString();
    this.$recc.api.getSelf().then(item => {
      this.username = item.username;
    });
  }

  onClickToast() {
    this.$recc.toastSuccess('TOAST', 'DETAIL');
  }

  onClickMove() {
    this.$recc.moveToName('mainDashboard');
  }

  onClickFullscreen() {
    this.$recc.flipFullscreenMode();
  }
}
</script>
