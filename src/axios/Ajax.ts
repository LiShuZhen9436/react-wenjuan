/**
 * axios 封装
 */

import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../untils/user_token';

const request = axios.create({
  // baseURL: 'http://127.0.0.1:8000/', 后台接口的基准地址
  timeout: 5000,
});

// axios请求拦截
request.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios响应拦截
request.interceptors.response.use((res) => {
  // 类型转换
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }

  return data as any;
});

export default request;

// 定义接口返回数据类型格式 ts
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

// 定义接口返回数据中data 数据的ts类型
export type ResDataType = {
  // key 是字符串类型，value是any类型
  [key: string]: any;
};
