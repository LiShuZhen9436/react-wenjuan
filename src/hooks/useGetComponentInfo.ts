/*
 * 从redux中获取组件 数据
 */
import { useSelector } from 'react-redux';
import { stateType } from '../store';

import { CompontesSteteType } from '../store/componentsReducer';

function useGetComponentsInfo() {
  // copiedComponent 复制的组件
  // 未使用撤销重做 undo插件
  // const { componentList, selected, copiedComponent } = useSelector<stateType>((state) => state.components) as CompontesSteteType;
  // 使用撤销重做 undo插件
  const { componentList, selected, copiedComponent } = useSelector<stateType>(
    (state) => state.components.present
  ) as CompontesSteteType;
  // 获取到当前选中的组件
  const selectedComponent = componentList.find((i) => i.fe_id === selected);
  return { componentList, selected, selectedComponent, copiedComponent };
}

export default useGetComponentsInfo;
