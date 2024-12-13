import { createRouter, createWebHistory } from "vue-router";
import chat from "@/views/chat/index.vue";
import login from "@/views/login/index.vue";
import accountManagement from "@/views/accountManagement/index.vue";
import accountGrouping from "@/views/accountGrouping/index.vue";
import modifyInfo from "@/views/task/modifyInfo.vue";
import massSending from "@/views/task/massSending.vue";
import setDataTemplate from "@/views/task/setDataTemplate.vue";
import massSendingTemplate from "@/views/task/massSendingTemplate.vue";
import sourceMaterialGrouping from "@/views/sourceMaterial/sourceMaterialGrouping.vue";
import textSourceMaterial from "@/views/sourceMaterial/textSourceMaterial.vue";
import imageSourceMaterial from "@/views/sourceMaterial/imageSourceMaterial.vue";
import audioSourceMaterial from "@/views/sourceMaterial/audioSourceMaterial.vue";
import videoSourceMaterial from "@/views/sourceMaterial/videoSourceMaterial.vue";

import layout from "@/layout/index.vue";
import { useUserInfo } from "@/store/index.js";

const whiteList = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      meta: {
        title: "账号",
        name: "account",
        icon: "User",
      },
      children: [
        {
          path: "/accountManagement",
          component: accountManagement,
          name: "accountManagement",
          meta: {
            title: "账号管理",
            icon: "User",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/accountGrouping",
          component: accountGrouping,
          name: "accountGrouping",
          meta: {
            title: "账号分组",
            icon: "List",
            keepAlive: false,
            isDetails: false,
          },
        },
      ],
      component: layout,
    },
    {
      path: "/chat",
      meta: {
        title: "聊天室",
        name: "chat",
        icon: "ChatDotRound",
      },
      children: [
        {
          path: "/chat",
          component: chat,
          name: "chat",
          meta: {
            title: "账号管理",
            icon: "ChatDotRound",
            keepAlive: false,
            isDetails: false,
          },
        },
      ],
      component: chat,
    },
    {
      path: "/task",
      meta: {
        title: "任务",
        name: "task",
        icon: "Tickets",
      },
      children: [
        {
          path: "/modifyInfo",
          component: modifyInfo,
          name: "modifyInfo",
          meta: {
            title: "修改头像昵称",
            icon: "Postcard",
            keepAlive: false,
            isDetails: false,
          },
        },

        {
          path: "/massSending",
          component: massSending,
          name: "massSending",
          meta: {
            title: "群发任务",
            icon: "ChatLineSquare",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/setDataTemplate",
          component: setDataTemplate,
          name: "setDataTemplate",
          meta: {
            title: "修改资料模板",
            icon: "ChatLineSquare",
            keepAlive: false,
            isDetails: false,
          },
        },

        {
          path: "/massSendingTemplate",
          component: massSendingTemplate,
          name: "massSendingTemplate",
          meta: {
            title: "群发模板",
            icon: "ChatLineSquare",
            keepAlive: false,
            isDetails: false,
          },
        },
      ],
      component: layout,
    },
    {
      path: "/sourceMaterial",
      meta: {
        title: "素材",
        name: "sourceMaterial",
        icon: "Box",
      },
      children: [
        {
          path: "/sourceMaterialGrouping",
          component: sourceMaterialGrouping,
          name: "sourceMaterialGrouping",
          meta: {
            title: "素材分组",
            icon: "Files",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/textSourceMaterial",
          component: textSourceMaterial,
          name: "textSourceMaterial",
          meta: {
            title: "文本素材",
            icon: "Document",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/imageSourceMaterial",
          component: imageSourceMaterial,
          name: "imageSourceMaterial",
          meta: {
            title: "图片素材",
            icon: "Picture",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/videoSourceMaterial",
          component: videoSourceMaterial,
          name: "videoSourceMaterial",
          meta: {
            title: "视频素材",
            icon: "VideoCameraFilled",
            keepAlive: false,
            isDetails: false,
          },
        },
        {
          path: "/audioSourceMaterial",
          component: audioSourceMaterial,
          name: "audioSourceMaterial",
          meta: {
            title: "音频素材",
            icon: "Mic",
            keepAlive: false,
            isDetails: false,
          },
        },
      ],
      component: layout,
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
