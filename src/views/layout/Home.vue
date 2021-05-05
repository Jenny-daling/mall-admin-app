<template>
  <div class="home">
    <left-menu :key="key" />
    <div :class="{'main-app': true, 'menu-unfold': collapsed}">
      <slider-nav/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import leftMenu from './components/Menu.vue';
import sliderNav from './components/SliderNav.vue';

export default {
  components: {
    leftMenu,
    sliderNav,
  },
  data() {
    return {
      key: new Date().getTime(), // 为了保证路由的改变引起组件的重新渲染，为该组件绑定一个时间戳,一旦路由改变就重新获取时间戳
      // collapsed: this.$store.state.collapsed, // 是否被折叠，true表示被折叠，false表示不被折叠。
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();// 获取当前时间戳
    },
  },
  computed: {
    ...mapState(['collapsed']),
  },
};
</script>
<style lang="less">
  // ~@表示当前的src目录
  @import url('~@/assets/css/home.less');
</style>
