<template>
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <template>
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
        </a-breadcrumb>
      </template>

    </div>
    <div class="user-info">
      <li class="user-name">
        欢迎,{{ username }}
        <a-icon type="down"></a-icon>
      </li>
      <li class="login-out" @click="logOut">退出</li>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    // 计算属性：是否被折叠，true表示被折叠，false表示不被折叠。
    ...mapState(['collapsed', 'username']),
  },
  methods: {
    ...mapActions(['changeCollapsed', 'loginOut']),
    toggleCollapsed() {
      this.changeCollapsed();
    },
    // 退出登录按钮的点击事件，实现用户登录状态的切换
    logOut() {
      this.loginOut();
      this.$router.push({ // 一旦用户点击退出就会自动跳转至登录页面
        name: 'Login',
      });
    },
  },
};
</script>

<style>

</style>
