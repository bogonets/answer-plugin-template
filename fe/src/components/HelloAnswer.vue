<i18n lang="yaml">
en:
  lang: 'English'
  theme: 'Toggle Dark Mode'
  hello: 'Welcom to {title}!'

ko:
  lang: '한글'
  theme: '어두운 모드'
  hello: '{title}에 어서 오세요!'
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
          {{ $t('hello', {title}) }}
        </span>
      </v-col>

      <v-col cols="12">
        <v-btn color="secondary" @click="onClickHello">
          <v-icon left>{{ icons.mdiThemeLightDark }}</v-icon>
          {{ $t('theme') }}
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-list :dense="dense">
          <v-list-item-group
            mandatory
            color="primary"
            v-model="langIndex"
            @change="onChangeLang"
          >
            <v-list-item v-for="lang in languages" :key="lang">
              <v-list-item-content>
                <v-list-item-title v-text="$t('lang', lang)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {mdiThemeLightDark} from '@mdi/js';
import logo from '@/assets/logo.svg';

export const LANG_EN = 'en';
export const LANG_KO = 'ko';
export const LANGUAGES = [LANG_EN, LANG_KO];

@Component
export default class HelloAnswer extends Vue {
  private readonly languages = LANGUAGES;
  private readonly assets = {logo};
  private readonly icons = {mdiThemeLightDark};

  @Prop({type: String, default: 'ANSWER'})
  private title!: string;

  langIndex = 0;

  created() {
    this.langIndex = LANGUAGES.indexOf(this.$i18n.locale);
  }

  onClickHello() {
    this.changeDark(!this.$vuetify.theme.dark);
  }

  onChangeLang(index: number) {
    this.changeLang(this.languages[index]);
  }

  @Emit('change:dark')
  changeDark(dark: boolean) {
    return dark;
  }

  @Emit('change:lang')
  changeLang(lang: string) {
    return lang;
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
