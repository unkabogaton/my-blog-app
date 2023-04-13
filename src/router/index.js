// Composables
import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const requireAuth = (to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      next();
    } else {
      next({ name: "Home" });
    }
  });
};
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
    component: () => import("@/views/BlogCreate.vue"),
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true,
      title: "Create"
    }
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("@/views/BlogView.vue"),
    meta: {
      title: "View"
    }
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("@/views/BlogEdit.vue"),
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true,
      title: "Edit Blog"
    }
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    component: () => import("@/views/BlogList.vue"),
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true,
      title: "Blog List"
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/BlogSearch.vue"),
    meta: {
      title: "Search"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/BlogLogin.vue"),
    meta: {
      title: "Login"
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/BlogSignup.vue"),
    meta: {
      title: "Sign up"
    }
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
