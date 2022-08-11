import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import PackageJson from '@/../package.json';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundError from '@/views/error/NotFoundError.vue';

Vue.use(VueRouter);

export const routeNames = {
  mainHome: 'mainHome',
  mainAbout: 'mainAbout',
};

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
    component: HomeView,
  },
  {
    path: '/about',
    name: routeNames.mainAbout,
    component: AboutView,
  },
  {
    path: '*',
    component: NotFoundError,
  },
];

export default new VueRouter({
  mode: 'history',
  base,
  routes,
});
