import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { produce } from 'immer';

// state 类型
export type pageInfoType = {
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};
// 初始值
const INIT_STATE: pageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  // isPublished: false,
};
const pageInfo = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE, // state初始值
  reducers: {
    // 设置整个state的信息
    resetPageInfo: (state: pageInfoType, action: PayloadAction<pageInfoType>) => {
      return action.payload;
    },
    // 使用 immer 修改 title属性
    updatePageInfoTitle: produce(
      (draft: pageInfoType, action: PayloadAction<{ title: string }>) => {
        const { title } = action.payload;
        draft.title = title;
      }
    ),
  },
});

export const { resetPageInfo, updatePageInfoTitle } = pageInfo.actions;

export default pageInfo.reducer;
