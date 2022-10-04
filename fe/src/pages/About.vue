<i18n lang="yaml">
en:
  about: 'About Page'

ko:
  about: '어바웃 페이지'
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
        <span class="mt-2">{{ $t('about') }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import logo from '@/assets/logo.svg';

@Component
export default class About extends Vue {
  readonly assets = {logo};
}
</script>
