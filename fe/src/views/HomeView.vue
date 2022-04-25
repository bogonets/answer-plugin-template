<template>
  <hello-answer
    title="ANSWER PLUGIN"
    @change:dark="onChangeDark"
    @change:lang="onChangeLang"
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
  onChangeDark(dark: boolean) {
    this.$vuetify.theme.dark = dark;
  }

  onChangeLang(lang: string) {
    this.$i18n.locale = lang;
    this.$vuetify.lang.current = lang;
  }
}
</script>
