<template>
  <div class="menu-list">
    <a-menu
    class="ant-menu"
    :default-selected-keys="['1']"
    :default-open-keys="['sub1']"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    >
      <template v-for="route in menuRoutes">
        <a-sub-menu
        v-show="route.name === 'Login' ? !route.hidden : true"
        :key="route.name"
        >
          <span slot="title">
            <a-icon type="mail" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="child in route.children">
            <a-menu-item
            :key="child.name"
            v-if="child"
            >
            {{ child.meta.title }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // collapsed: this.$store.state.collapsed, // 是否被折叠，true表示被折叠，false表示不被折叠。
    };
  },
  computed: {
    ...mapState(['collapsed', 'menuRoutes']),
  },
};
</script>

<style>

</style>
