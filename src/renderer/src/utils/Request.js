
import axios from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8999", // 你的后端 API 地址
  timeout: 1000 * 30, // 请求超时设置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在请求头中添加 token 等信息
    const token = localStorage.getItem('token'); // 从本地存储中获取 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data; // 返回响应数据
    }
    return Promise.reject(response);
  },
  error => {
    // 处理错误
    return Promise.reject(error);
  }
);

export default axiosInstance;
