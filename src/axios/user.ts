import axios, { ResDataType } from './Ajax';

// 获取用户信息
export async function getUserInfo(): Promise<ResDataType> {
  const data = await axios.get(`/api/userInfo`);
  return data;
}
// 注册
export async function userRegister(
  username: string,
  password: string,
  nickname: string
): Promise<ResDataType> {
  const body = { username, password, nickname: nickname || username };
  const data = await axios.post(`/api/user/register`, body);
  return data;
}
// 登录
export async function userLogin(username: string, password: string): Promise<ResDataType> {
  const body = { username, password };
  const data = await axios.post(`/api/user/login`, body);
  return data;
}
