/*
 * @Author: Est
 * @Date: 2023-03-31 10:51:41
 * @LastEditors: Est
 * @LastEditTime: 2023-04-24 11:03:13
 * @FilePath: \public-zone美食专区\src\utils\request.js
 * @Description: 
 */
import axios from 'axios';
import { showDialog, showToast, closeToast, showFailToast } from 'vant';

import router from '@/router'

// 配置新建一个 axios 实例	
const service = axios.create({
	baseURL: import.meta.env.VITE_NODE_ENV === 'dev' ? '/api' : import.meta.env.VITE_NODE_APP_BASE, //接口地址
	timeout: 100000,
	headers: {
		'Content-Type': 'application/json'
	}
});
// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		if (config.method === 'get') {
			config.url = config.url + '?' + config.data;
			delete config.data;
		}
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
		if (res.code != 0) {
			setTimeout(() => {
				showToast(res.errormsg)
			}, 1000);
		}
		return res;
	},
	(error) => {
		closeToast()
		return Promise.reject(error);
	}
)

// 导出 axios 实例
export default service;
