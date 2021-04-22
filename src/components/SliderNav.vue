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
      <li class="login-out">退出</li>
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
    ...mapActions(['changeCollapsed']),
    toggleCollapsed() {
      this.changeCollapsed();
    },
  },
};
</script>

<style>

</style>
