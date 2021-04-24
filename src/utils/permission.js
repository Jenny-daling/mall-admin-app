// 存储角色到路由的对应关系,规定不同角色所能访问的路由
const roleToRoute = {
  customer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
  ],
};
// 将路由角色映射表以方法调用的形式传递出去
/**
 * 过滤掉没有权限的路由
 * @param {string} role 用户角色
 * @param {Array} routes 侧边导航栏路由
 */
export default function getMenuRoute(role, routes) {
  // 根据角色名获取权限名称
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // 将所有路由根据用户能否访问进行过滤
  const resultRoutes = routes.filter((r) => {
    // 如果允许访问的路由中存在该路由的名称，就返回true
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      // 获取用户想要访问的路由的子路由
      const { children } = obj;
      // 将包含在允许访问的范围之内的用户想要访问的路由的子路返回
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  // 将侧边导航路由经过过滤和筛选得到允许访问的列表
  return resultRoutes;
}
