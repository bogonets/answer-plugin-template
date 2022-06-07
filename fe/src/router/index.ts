import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';

Vue.use(VueRouter);

const publicPath = '/plugins/template/';

const routes: Array<RouteConfig> = [
  {
    path: publicPath + 'labeling',
    name: 'home',
    component: HomeView,
  },
  {
    path: publicPath + 'about',
    name: 'about',
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
