import axios from 'axios';

// appkey： jenny-daling_1614996995295
// 配置公共地址
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});

// 请求发送时的拦截器，将部分接口需要的appkey配置其中
instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) { // 如果该接口不需要appkey就直接返回请求
    return config;
  }
  return { // 否则就将请求参数进行拼接
    ...config,
    params: {
      ...config.params,
      appkey: 'jenny-daling_1614996995295',
    },
  };
}, (error) => Promise.reject(error));

// 请求返回时的拦截器
instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
