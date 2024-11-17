import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  }),
  actions: {
    setLoginStatus(status) {
      this.isLogin = status;
      localStorage.setItem('isLogin', JSON.stringify(status));
    },
    setUserInfo(info) {
      this.userInfo = info;
      localStorage.setItem('userInfo', JSON.stringify(info));
    },
    getUserInfo() {
      return this.userInfo;
    }
  },
});
