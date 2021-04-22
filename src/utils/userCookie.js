// 该文件用于存储用户的基本信息，提供对信息用户的操作
import Cookies from 'js-cookie';
/**
 * 将用户信息设置到cookie中
 * @param {Object} info 用户信息对象
 */
export function setUserCookies(info) {
  const arr = Object.entries(info);// 获取用户信息对象的key和value值
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);// 将用户信息设置到cookies中
  }
  return true;
}

// 获取用户的cookie信息
export function getUserCookies() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

// 删除携带用户信息的cookies
export function removeUserCookies() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
