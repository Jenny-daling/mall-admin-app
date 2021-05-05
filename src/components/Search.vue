<template>
  <a-form-model
  layout="inline"
  @submit="handleSubmit"
  @submit.native.prevent
  class="search-box"
  >
    <a-form-model-item label="检索关键字">
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
      show-search
      placeholder="请选择商品类目"
      style="width: 200px"
      @change="handleChange"
      allowClear
      >
        <a-select-option
        v-for="c in categoryList"
        :key="c.id"
        :value="c.name">
            {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
      <!-- :disabled="searchForm.searchWord === '' || searchForm.category === ''" -->
        查询
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
// import categoryAPI from '@/api/category';

export default {
  props: ['categoryList'],
  data() {
    return {
      // 用于存储用户的基本信息
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    // 表单提交时触发的行为
    handleSubmit() {
      this.$emit('submit', this.searchForm);// 子组件触发父组件的事件
    },
    // 切换类目时触发的事件
    handleChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>

<style lang='less'>
.search-box{
 padding:10px 30px;
}
</style>
