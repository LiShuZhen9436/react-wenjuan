/**
 * 根据 reducers模块 生成store
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userType } from './userReducer';
import componentsReducer, { CompontesSteteType } from './componentsReducer';
import pageInfoReducer, { pageInfoType } from './pageInfoReducer';
// 撤销，重做用到的插件
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

// 定义模块user的类型 user 模块的名称
export type stateType = {
  user: userType;
  // 未使用撤销重做 undo插件
  // components: CompontesSteteType;
  // 使用撤销重做 undo插件
  components: StateWithHistory<CompontesSteteType>;
  pageInfo: pageInfoType;
};

export default configureStore({
  // reducer对象中的键要和userReducer等引入文件中的name对应
  reducer: {
    user: userReducer,
    // 未使用撤销重做 undo插件
    // components: componentsReducer,
    // 使用撤销重做 undo插件
    components: undoable(componentsReducer, {
      limit: 20, // 限制20次的撤销和重做
      filter: excludeAction([
        // 不记录的action
        'components/resetCompentents',
        'components/setSelected',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
  //   分模块 比如扩展问卷的信息
});

// export default store;
