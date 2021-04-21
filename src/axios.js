import axios from 'axios';

// appkey： jenny-daling_1614996995295
// 配置公共地址
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});

// 请求发送时的拦截器
instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => Promise.reject(error));

// 请求返回时的拦截器
instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
