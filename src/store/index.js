import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 表示左侧菜单栏收缩/拉伸的标志，false表示菜单拉伸，true表示收缩
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;// 菜单栏拉伸标志取反
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');// 通过触发相应的事件间接触发changeCollapsed事件
    },
  },
  modules: {
  },
});
