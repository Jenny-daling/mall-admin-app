<template>
  <a-table :columns="columns" :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(text, record)">编辑</a-button>
      <a-button @click="removeProduct(text, record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
    // 拿到每一个商品类目的名称
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender: (text, record) => (record.status === 1 ? '上架' : '下架'),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: ['data', 'page'],
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    // 一旦信息显示的页面改变就触发该事件
    changePage(page) {
      this.$emit('change', page);// 本组件给父组件传参
    },
    // 商品编辑按钮
    editProduct(text, record) {
      this.$emit('edit', record);
    },
    // 商品删除按钮
    removeProduct(text, record) {
      this.$emit('delete', record);
    },
  },
};
</script>
