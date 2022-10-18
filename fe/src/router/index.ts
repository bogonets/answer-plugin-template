import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import PackageJson from '@/../package.json';

import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import NotFound from '@/pages/error/NotFound.vue';

Vue.use(VueRouter);

export const routeNames = {
  mainHome: 'mainHome',
  mainAbout: 'mainAbout',
};

const mode = 'history';
const base = PackageJson.publicPath;
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: routeNames.mainHome,
    },
  },
  {
    path: '/home',
    name: routeNames.mainHome,
    component: Home,
  },
  {
    path: '/about',
    name: routeNames.mainAbout,
    component: About,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default new VueRouter({
  mode,
  base,
  routes,
});
