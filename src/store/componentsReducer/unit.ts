import { ComponentInfoType, CompontesSteteType } from './index';
function getNextSelected(selected: string, componentList: Array<ComponentInfoType>) {
  const isNoVisibleComponentsList = componentList.filter((i) => !i.isHidden);
  const index = isNoVisibleComponentsList.findIndex((c) => c.fe_id === selected);

  let newSelected = '';
  if (index < 0) return '';
  const length = isNoVisibleComponentsList.length;
  if (length <= 1) newSelected = '';
  else {
    if (index + 1 == length) {
      // 最后，则选中上一个
      newSelected = isNoVisibleComponentsList[index - 1].fe_id;
    } else {
      newSelected = isNoVisibleComponentsList[index + 1].fe_id;
    }
  }
  return newSelected;
}

export default getNextSelected;

// 生成新组件
export function newSelectedComponent(draft: CompontesSteteType, action: ComponentInfoType) {
  const { selected, componentList } = draft;
  const index = componentList.findIndex((item) => selected == item.fe_id);
  // 当前没有选中项
  if (index < 0) {
    componentList.push(action);
    return;
  }
  // 当前有选中的值，在当前选中项的下面添加组件
  componentList.splice(index + 1, 0, action);
  // 设置选中项 为当前添加的最新项
  draft.selected = action.fe_id;
}
