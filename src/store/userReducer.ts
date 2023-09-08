/**
 * 用户 相关reducers
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义用户登录信息的ts类型
export type userType = {
  username: string;
  nickname: string;
};

// 定义state的初始化值
const INIT_USER_STATE: userType = { username: '', nickname: '' };

const userSlice = createSlice({
  name: 'user', // 模块的名称，redux可以有多个模块
  initialState: INIT_USER_STATE, // state 的初始值
  // action state的操作方法
  reducers: {
    // 登录 设置state
    loginReducer(state: userType, action: PayloadAction<userType>) {
      return action.payload;
    },
    // 退出登录 用户信息设置为 初始值
    loginOutReducer: () => INIT_USER_STATE,
  },
});

// 在createSlice的reducers中注册了方法后，在userSlice.actions中就可以获取到
export const { loginReducer, loginOutReducer } = userSlice.actions;
// 导出reducer，注意不是在userSlice中定义的reducers
export default userSlice.reducer;

// 在index.ts中引入；在index.tsx中添加provide包裹 并传入store
