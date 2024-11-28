import { defineStore } from "pinia";

export const useUserInfo = defineStore("userInfo", {
  state: () => ({
    userInfo: null,
    type: null,
    token: null,
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
