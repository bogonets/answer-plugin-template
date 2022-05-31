import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import HomeView from '@/views/HomeView.vue';

Vue.use(VueRouter);

const publicPath = '/plugins/annotation/';

const routes: Array<RouteConfig> = [
  {
    path: publicPath + 'labeling',
    name: 'home',
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
