import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/",
    //  name:'layout',
    component: () => import("@/views/layout/layout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/home.vue")
      },
      {
        path: "/question",
        name: "question",
        component: () => import("@/views/question/question.vue")
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/my.vue")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video/video.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
