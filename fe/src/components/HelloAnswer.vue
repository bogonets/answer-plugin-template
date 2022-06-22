<i18n lang="yaml">
en:
  lang: 'English'
  theme: 'Toggle Dark Mode'
  hello: '{username}, welcome to {title}!'
  toast: 'Toast'
  move: 'Move'
  fullscreen: 'Fullscreen'

ko:
  lang: '한글'
  theme: '어두운 모드'
  hello: '{username}님, {title}에 어서 오세요!'
  toast: '토스트'
  move: '이동'
  fullscreen: '전체 화면'
</i18n>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <v-img :src="assets.logo" contain height="180" />
        </div>
      </v-col>

      <v-col cols="12">
        <span class="hello-answer">
          {{ $t('hello', {username, title}) }}
        </span>
      </v-col>

      <v-col cols="12">
        <v-icon large>{{ icons.mdiThemeLightDark }}</v-icon>
      </v-col>

      <v-col cols="12">
        <v-btn class="mr-2" small @click="onClickToast">
          {{ $t('toast') }}
        </v-btn>

        <v-btn class="mr-2" small @click="onClickMove">
          {{ $t('move') }}
        </v-btn>

        <v-btn small @click="onClickFullscreen">
          {{ $t('fullscreen') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {mdiThemeLightDark} from '@mdi/js';
import logo from '@/assets/logo.svg';

@Component
export default class HelloAnswer extends Vue {
  private readonly assets = {logo};
  private readonly icons = {mdiThemeLightDark};

  @Prop({type: String, default: ''})
  private title!: string;

  @Prop({type: String, default: ''})
  private username!: string;

  @Emit('click:toast')
  onClickToast() {
    // EMPTY.
  }

  @Emit('click:move')
  onClickMove() {
    // EMPTY.
  }

  @Emit('click:fullscreen')
  onClickFullscreen() {
    // EMPTY.
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

$color-grey: map-get($colors, 'grey');
$color-grey-base: map-get($color-grey, 'base');
$color-grey-lighten-1: map-get($color-grey, 'lighten-1');
$color-grey-darken-3: map-get($color-grey, 'darken-3');

.theme--light.v-application {
  .hello-answer {
    background-color: $color-grey-lighten-1;
  }
}

.theme--dark.v-application {
  .hello-answer {
    background-color: $color-grey-darken-3;
  }
}

.hello-answer {
  padding: 8px;
  border: 1px solid $color-grey-base;
  border-radius: 4px;
}
</style>
