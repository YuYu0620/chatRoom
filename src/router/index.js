import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home/index.vue";
import login from "../views/login/index.vue";
import { useUserInfo } from "../store/index.js";

const whiteList = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserInfo();

  console.log("userStore.toke =======> ", userStore.token, to);
  // 1.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
  if (to.path === "/login") {
    if (userStore.token) return next(from.fullPath);
    return next();
  }

  // 2.判断访问页面是否在路由白名单(不需要登陆)地址中，如果存在直接放行
  if (whiteList.includes(to.path)) return next();

  // 3.判断是否有 Token，没有token跳转到登陆页面
  if (!userStore.token) {
    return next("login");
  }

  // if ((!userStore.type || userStore.type != to.name) && to.name != "index") {
  //   return next("/");
  // }
  //   initDynamicRouter();
  next();
});

export default router;
