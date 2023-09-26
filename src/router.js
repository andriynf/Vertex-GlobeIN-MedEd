// import Vue from "vue";
// import VueRouter from "vue-router";
import { createRouter,createWebHistory} from 'vue-router'

// Vue.use(VueRouter);

// function load(component) {
//   return require(`./views/${component}.vue`).default;
// }

const routes = [
  {
    path: "/",
    redirect: { name: "loading" },
  },
  {
    name: "loading",
    path: "/loading",
    component: () => import('./views/Loading.vue'),
  },
  {
    name: "attract",
    path: "/attract",
    component: () => import('./views/Attract.vue'),
  },
	{
    name: "homepage",
    path: "/homepage",
    component: () => import('./views/Home.vue'),
  },
	{
    name: "overview",
    path: "/overview",
    component: () => import('./views/Overview.vue'),
  },
	{
    name: "interactive",
    path: "/interactive",
    component: () => import('./views/Interactive.vue'),
  },
	{
    name: "podcasts",
    path: "/podcasts",
    component: () => import('./views/Podcasts.vue'),
  },
	{
    name: "community",
    path: "/community",
    component: () => import('./views/Community.vue'),
  },
	{
    name: "website",
    path: "/website",
    component: () => import('./views/Website.vue'),
  },

	{
    name: "error",
    path: '/:pathMatch(.*)*',
    component: () => import('./views/Error404.vue'),
    meta: {
      title: "GlobeIN | Error Page",
    },
  },
];

const router = createRouter({
  // mode: 'history',
	history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
