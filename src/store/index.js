import Vue from 'vue';
import Vuex from 'vuex';
import { getUserCookies, setUserCookies, removeUserCookies } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 表示左侧菜单栏收缩/拉伸的标志，false表示菜单拉伸，true表示收缩
    user: getUserCookies(), // 用户的信息，保存在cookie中
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;// 菜单栏拉伸标志取反
    },
    // 给user对象赋值
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    loginOut(state) { // 用户退出登录
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');// 通过触发相应的事件间接触发changeCollapsed事件
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserCookies(userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
      removeUserCookies();
    },
  },
  modules: {
  },
});
