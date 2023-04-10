// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/BlogHome.vue")
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/BlogCreate.vue")
  },
  {
    path: "/view",
    name: "View",
    component: () => import("@/views/BlogView.vue")
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    component: () => import("@/views/BlogList.vue")
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

export default router;
