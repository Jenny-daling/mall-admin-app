<template>
<div class="product-list">
  <search-box @submit="searchSubmit"/>
</div>
</template>
<script>
import searchBox from '@/components/Search.vue';

export default {
  components: {
    searchBox,
  },
  data() {
    return {

    };
  },
  methods: {
    searchSubmit(form) { // 在父组件中绑定的事件，其参数由子组件提供
      console.log(form);
    },
  },
};
</script>
