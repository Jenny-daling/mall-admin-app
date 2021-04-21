// 对于用户操作的接口管理
import axios from '@/axios';// 导入设置了拦截器的请求实例

export default {
  // 当用户登录时发出的请求
  login(params) {
    return axios.post('/passport/login', params);
  },
};
