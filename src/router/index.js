// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/BlogHome.vue"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/BlogCreate.vue")
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("@/views/BlogView.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("@/views/BlogEdit.vue")
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    component: () => import("@/views/BlogList.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/BlogSearch.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/BlogLogin.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/BlogSignup.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `Lib Hub | ${to.meta.title}`;
  next();
});

export default router;
