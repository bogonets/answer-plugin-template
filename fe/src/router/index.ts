import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import {Dictionary} from 'vue-router/types/router';
import PackageJson from '@/../package.json';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import _ from 'lodash';

Vue.use(VueRouter);

const PUBLIC_PATH = PackageJson.publicPath;

export const routeNames = {
  mainHome: 'mainHome',
  mainAbout: 'mainAbout',
};

const routes: Array<RouteConfig> = [
  {
    path: PUBLIC_PATH + 'home',
    name: routeNames.mainHome,
    component: HomeView,
  },
  {
    path: PUBLIC_PATH + 'about',
    name: routeNames.mainAbout,
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export type ParamsType = Dictionary<string>;
export type QueryType = Dictionary<string | (string | null)[] | null | undefined>;

export function moveToBack() {
  router.back();
}

export function moveTo(name: string, params?: ParamsType, query?: QueryType) {
  if (router.currentRoute.name === name) {
    const paramsEqual = _.isEqual(params, router.currentRoute.params);
    const queryEqual = _.isEqual(query, router.currentRoute.query);
    if (paramsEqual && queryEqual) {
      return;
    }
  }

  const rawLocation = {
    name: name,
    params: params,
    query: query,
  } as RawLocation;

  router.push(rawLocation).catch(reason => {
    if (reason.name !== 'NavigationDuplicated') {
      throw reason;
    }
  });
}

// TODO: More Routing APIs

export default router;
