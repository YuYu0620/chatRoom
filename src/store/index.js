import { defineStore } from "pinia";

export const useUserInfo = defineStore("userInfo", {
  state: () => ({
    userInfo: null,
    type: null,
    token: null,
    router: {
      sidebar: null,
      list: [],
      active: null,
      title: null,
      path: "",
    },
  }),

  persist: {
    enabled: true,
  },

  action: {
    add(item) {
      this.msgList.push(item);
    },
    delete(index = 0) {
      this.msgList.splice(index, 1);
    },
  },
});
