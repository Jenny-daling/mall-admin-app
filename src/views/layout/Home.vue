<template>
  <div class="home">
    <left-menu/>
    <div :class="{'main-app': true, 'menu-unfold': collapsed}">
      <slider-nav/>
    </div>
  </div>
</template>

<script>
import leftMenu from '@/components/Menu.vue';
import sliderNav from '@/components/SliderNav.vue';
import { mapState } from 'vuex';

export default {
  components: {
    leftMenu,
    sliderNav,
  },
  data() {
    return {
      // collapsed: this.$store.state.collapsed, // 是否被折叠，true表示被折叠，false表示不被折叠。
    };
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
