<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <v-img :src="assets.logo" contain height="180" />
        </div>
      </v-col>

      <v-col cols="12">
        <span>About Page</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import logo from '@/assets/logo.svg';

@Component
export default class AboutView extends Vue {
  private readonly assets = {logo};
}
</script>
