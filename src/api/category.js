// 所有类目的接口
import axios from '@/axios';

// eslint不允许直接给module.exports直接赋值
export default {
  list(params) {
    return axios.get('/category/all', {
      params,
    });
  },
};
