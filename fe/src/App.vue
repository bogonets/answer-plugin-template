<template>
  <v-app>
    <v-main>
      <div v-if="productionMode">
        <!------------------------->
        <!--[[ Production Mode ]]-->
        <!------------------------->
        <v-progress-linear
          v-show="loading"
          color="primary accent-4"
          indeterminate
          rounded
        ></v-progress-linear>
        <router-view></router-view>
      </div>
      <div v-else>
        <!-------------------------->
        <!--[[ Development Mode ]]-->
        <!-------------------------->
        <v-system-bar color="warning">
          <span>This is not production mode</span>
          <v-spacer></v-spacer>
          <div v-if="init">
            <v-menu transition="slide-x-transition" bottom right offset-y>
              <template v-slot:activator="{on: menu, attrs}">
                <v-tooltip bottom>
                  <template v-slot:activator="{on: tooltip}">
                    <v-btn icon x-small v-bind="attrs" v-on="{...tooltip, ...menu}">
                      <v-icon>{{ icons.mdiMenu }}</v-icon>
                    </v-btn>
                  </template>
                  <span>Pages</span>
                </v-tooltip>
              </template>
              <v-list dense>
                <v-list-item
                  link
                  v-for="route in routes"
                  :key="route"
                  @click="onClickRoute(route)"
                >
                  <v-list-item-title>{{ route }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <v-btn icon x-small @click="onClickResign" v-bind="attrs" v-on="on">
                  <v-icon>{{ icons.mdiAccountSync }}</v-icon>
                </v-btn>
              </template>
              <span>Resign</span>
            </v-tooltip>
          </div>
        </v-system-bar>

        <v-progress-linear
          v-if="loading"
          color="primary accent-4"
          indeterminate
          rounded
        ></v-progress-linear>

        <dev-sign-in v-if="!init" @click:submit="onClickSubmit"></dev-sign-in>
        <router-view v-else></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {mdiAccountSync, mdiMenu} from '@mdi/js';
import DevSignIn from '@/components/dev/DevSignIn.vue';
import type {ReccCwcClientInit} from '@recc/api/dist/reccCwcClient';
import {routeNames} from '@/router';
import {moveTo} from '@/router/move';

function isProductionMode() {
  return process.env.NODE_ENV === 'production';
}

@Component({
  components: {
    DevSignIn,
  },
})
export default class App extends Vue {
  readonly icons = {mdiAccountSync, mdiMenu};
  readonly productionMode = isProductionMode();
  readonly routes = routeNames;

  loading = false;
  init = false;

  created() {
    if (this.productionMode) {
      this.loading = true;
      (async () => {
        await this.initProduction();
      })();
    } else {
      this.loading = false;
    }
  }

  async initProduction() {
    try {
      console.debug('[App] Initializing production mode ...');
      await this.$recc.waitInitialized();

      console.info(
        '[App] Initialization of production mode complete',
        this.$recc.asParams(),
      );

      this.$i18n.locale = this.$recc.lang;
      this.$vuetify.lang.current = this.$recc.lang;
      this.$vuetify.theme.dark = this.$recc.isDark;
      this.init = true;
    } catch (e) {
      this.init = false;
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async initDevelopment(params: ReccCwcClientInit) {
    try {
      console.debug('[App] Initializing development mode ...');
      await this.$recc.init(params);

      console.debug(
        '[App] Initialization of development mode complete',
        this.$recc.asParams(),
      );

      this.$i18n.locale = this.$recc.lang;
      this.$vuetify.lang.current = this.$recc.lang;
      this.$vuetify.theme.dark = this.$recc.isDark;
      this.init = true;
    } catch (e) {
      this.init = false;
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  onClickRoute(menuName: string) {
    moveTo(menuName);
  }

  onClickResign() {
    this.init = false;
  }

  onClickSubmit(params: ReccCwcClientInit) {
    this.loading = true;
    (async () => {
      await this.initDevelopment(params);
    })();
  }
}
</script>
