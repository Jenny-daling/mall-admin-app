import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';
// import getMenuRoute from '@/utils/permission';

import store from '@/store';

Vue.use(VueRouter);

// 侧边导航的路由地图
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'shop',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
    },
    component: () => import('../views/page/ProductList.vue'),
  },
  {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '商品添加',
      icon: 'file-add',
    },
    component: () => import('../views/page/ProductAdd.vue'),
  },
  {
    path: 'edit/:id', // 路由传参，这里的：id用于接收传递的参数
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
    },
    component: () => import('../views/page/ProductAdd.vue'),
  },
  {
    path: 'category',
    name: 'Category',
    meta: {
      title: '商品类目',
      icon: 'project',
    },
    component: () => import('../views/page/Category.vue'),
  },
  ],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
      },
      component: () => import('../views/page/Index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: false, // 用于标志侧边栏登录按钮是否需要隐藏，根据用户登录状态而决定
    },
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 没有验证角色的情况下使用以下改吗
router.addRoutes(asyncRouterMap);
store.dispatch('changeMenuRoutes', routes.concat(asyncRouterMap));

// 使用身份验证的情况下使用以下代码
// let isAddRoutes = false;// 用于标志是否已经添加menuRoutes
// // 在路由跳转之前需要执行的函数
// // 由于暂时没有添加注册页面，因此先将如下代码注释掉
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') { // 如果路由要跳转的不是登录界面
//     if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
//       if (!isAddRoutes) {
//         // 获取角色能够访问的路由数组
//         const menuRoutes = getMenuRoute(store.state.user.role, asyncRouterMap);
//
//         // 以下两步为异步代码
//         // router.addRoutes(menuRoutes);// 该方法多次执行添加同一批路由会报错
//         // 将routes中的路由和侧边栏的路由拼接到一起,在menu组建中动态渲染
//         store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
//           router.addRoutes(menuRoutes);// 该方法多次执行添加同一批路由会报错
//           next();
//         });
//         isAddRoutes = true;
//       }
//       return next();// 如果用户不去登录页面，并且用户信息都存在，页面就会正常跳转
//     }
//     return next('/login');// 如果用户用户不去登录页面但是同时用户没有登陆过路由就会跳转至登录页面。
//   }
//   return next();
// });

export default router;
