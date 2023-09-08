import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { ActionCreators as undoActionCreators } from 'redux-undo';
import {
  deleteComponent,
  copyComponent,
  pastComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer';

function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem == document.body) return true; // 光标没有focus到input
  // matches匹配某个元素是否符合css查询器；div[role="button"]是css查询器
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}
function useBindCanvasPress() {
  const dispatch = useDispatch();
  // 删除
  useKeyPress(['delete', 'backspace'], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteComponent());
  });
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copyComponent());
  });
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pastComponent());
  });
  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });
  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      dispatch(undoActionCreators.undo());
    },
    { exactMatch: true } // 精准匹配
  );
  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    dispatch(undoActionCreators.redo());
  });
}

export default useBindCanvasPress;
