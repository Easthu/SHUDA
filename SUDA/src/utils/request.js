import axios from 'axios';
import { showDialog, showToast, closeToast, showFailToast } from 'vant';

import router from '@/router'

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //接口地址
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么  校验token等用户登录权限
    if (localStorage.getItem('localStorageToken')) { //请求头添加token
      config.headers['Authorization'] = localStorage.getItem('localStorageToken');
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    // http状态码根据实际开发的项目进行调整
    if (res.status == "ERROR") {
      // 以下请求不进行Dialog.alert提示
      let apiUrl = {
        '/weChat/getsignature': false,
      }
      let showDialogState = Object.keys(apiUrl).some(url => {
        return response.request.responseURL.includes(url)
      })
      // 使用unescape解密页面路径的url
      let currentPageUrl = unescape(window.location.href)
      let isHaveOpenid = currentPageUrl.indexOf('?openid') === -1
      setTimeout(() => {
        showToast(res.errorMsg)
      }, 1000);
      if (!showDialogState && isHaveOpenid) { //showDialogState为false并且当前页面url链接不存在openid才提示
        Promise.reject(res);
        return res;
      } else {
        return res;
      }

    } else {
      return res;
    }
  },
  (error) => {
    closeToast()
    showFailToast('系统升级中')
    return Promise.reject(error);
  }
)

// 导出 axios 实例
export default service;
