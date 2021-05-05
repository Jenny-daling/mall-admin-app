<template>
<div class="product-list">
  <search-box @submit="searchSubmit"
    :categoryList="categoryList"
  />
  <!-- 添加商品按钮，直接链接到商品添加页面 -->
  <a-button class="product-add-btn">
    <router-link :to=" {name: 'ProductAdd' } ">添加商品</router-link>
  </a-button>
  <product-table :data="tableData" :page="page"
    @change="changePage"
    @edit="editProduct"
    @delete="removeProduct"
  />
  <!--由于异步的categoryList和tableData谁先拿到数据具有不确定性，
  因此应将类目的筛选转移到子组件中进行  -->
</div>
</template>
<script>
import searchBox from '@/components/Search.vue';
import productTable from '@/components/ProductTable.vue';
import api from '@/api/product';
import categoryAPI from '@/api/category';

export default {
  components: {
    searchBox,
    productTable,
  },
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      categoryObj: [], // 用于存储商品的所有种类
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  async created() {
    // 先获取商品种类信息
    await categoryAPI.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        if (!this.categoryObj[item.id]) {
          // 将商品的所有种类存储在categoryObj中
          this.categoryObj[item.id] = item;
        }
      });
    });
    // 页面渲染初期获取表格数据，根据商品种类显示商品类目
    this.getTableData();
  },
  methods: {
    searchSubmit(form) { // 在父组件中绑定的事件，其参数由子组件提供
      this.searchForm = form;// 将子组件传递过来的表单信息赋予this.searchForm
      // 该搜索功能有bug
      this.getTableData();// 用户一旦点击搜索按钮就重新渲染页面
      // console.log(this.searchForm);
    },
    // 获取表格数据
    getTableData() {
      // 发出请求
      api.list({
        page: this.page.current, // 获取的页数
        size: this.page.pageSize, // 每一页获取的数据量
        ...this.searchForm,
      }).then((res) => {
        this.page.total = res.total;
        // 将获取到的数据根据类目数值显示类目名称
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    // 接收子组件传递过来的page参数
    changePage(page) {
      this.page = page;// 将最新的page信息赋予page
      this.getTableData();// 根据最新的page获取数据
    },
    // 删除商品操作，其参数由子组件提供
    editProduct(record) {
      this.$router.push({ // 在路由跳转时进行路由传参
        name: 'ProductEdit', // 路由组件的名称
        params: {
          id: record.id, // 在路由中传递的参数,id对应路由中接收的参数名称
        },
      });
    },
    // 商品删除,参数由子组件提供
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style='color:red;'>{`确认删除商品 ${record.title} ?`}</div>,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => { // 确认删除后的操作
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 0;
    top: 15px;
  }
}
</style>
