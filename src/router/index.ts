import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ProjectsList from "../views/projects-list.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/list-view",
  },
  {
    path: "/",
    name: "project-list",
    component: ProjectsList,
    children: [
      {
        path: "card-view",
        name: "card-view",
        component: () => import("../components/projects-list/card-view.vue"),
      },
      {
        path: "list-view",
        name: "list-view",
        component: () => import("../components/projects-list/list-view.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
