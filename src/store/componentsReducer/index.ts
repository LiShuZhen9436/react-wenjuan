/**
 * 问卷组件 相关reducers
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { componentsPropsType } from '../../commponents/QuestionCompnents';
import { produce } from 'immer';
import getNextSelected, { newSelectedComponent } from './unit';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';
import { arrayMove } from '@dnd-kit/sortable';

export type ComponentInfoType = {
  // 组件id，类型，类型名称
  fe_id: string;
  title: string;
  type: string;
  isHidden?: boolean; // 隐藏/显示
  isLocked?: boolean; // 是否锁定
  // 组件的属性
  props: componentsPropsType;
};

// 多个组件 的类型
export type CompontesSteteType = {
  selected: string; // 当前选中项
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null; // 复制组件的类型
};

// 初始值
const INIT_STATE: CompontesSteteType = { componentList: [], selected: '', copiedComponent: null };

const compontesReducer = createSlice({
  name: 'components',
  initialState: INIT_STATE, // state的初始值
  reducers: {
    // 重置，把所有的组件都重置掉
    resetCompentents(state: CompontesSteteType, action: PayloadAction<CompontesSteteType>) {
      return action.payload;
    },
    // 修改当前组件列表的选中项
    setSelected: produce((draft: CompontesSteteType, action: PayloadAction<string>) => {
      draft.selected = action.payload;
      // return action.payload;
    }),
    // 点击左侧的组件库，将组件添加到redux中
    addComponent: produce((draft: CompontesSteteType, action: PayloadAction<ComponentInfoType>) => {
      newSelectedComponent(draft, action.payload);
    }),
    // 修改当前选中组件的属性
    updatePropsComponent: produce(
      (
        draft: CompontesSteteType,
        action: PayloadAction<{ fe_id: string; values: componentsPropsType }>
      ) => {
        const { componentList } = draft;
        const { fe_id, values } = action.payload;
        const comItem = componentList.find((c) => c.fe_id == fe_id);
        if (comItem) {
          comItem.props = values;
        }
      }
    ),
    // 隐藏、显示组件
    hiddenComponent: produce(
      (
        draft: CompontesSteteType,
        action: PayloadAction<{ selectId: string; isVisible: boolean }>
      ) => {
        const { selected, componentList } = draft;
        const { selectId, isVisible } = action.payload;
        let newSelected = '';
        if (isVisible) {
          // 隐藏
          newSelected = getNextSelected(selected, componentList); // 设置最新的选中项
        } else {
          newSelected = selected;
        }
        draft.selected = newSelected;

        const com = componentList.find((i) => i.fe_id == selectId);
        if (com) {
          com.isHidden = isVisible;
        }
      }
    ),
    // 删除组件
    deleteComponent: produce((draft: CompontesSteteType) => {
      const { selected, componentList } = draft;
      const newSelected = getNextSelected(selected, componentList); // 设置最新的选中项
      draft.selected = newSelected;
      const index = componentList.findIndex((i) => i.fe_id === selected); // 删除选中的项
      componentList.splice(index, 1);
    }),
    // 锁定、解锁组件
    lockComponent: produce(
      (draft: CompontesSteteType, action: PayloadAction<{ fe_id: string }>) => {
        const { selected, componentList } = draft;
        const { fe_id } = action.payload;
        const compone = componentList.find((i) => i.fe_id === fe_id);
        if (compone) {
          compone.isLocked = !compone.isLocked;
        }
      }
    ),
    // 复制组件
    copyComponent: produce((draft: CompontesSteteType) => {
      const { selected, componentList } = draft;
      const com = componentList.find((i) => i.fe_id == selected);
      // 通过深拷贝 拷贝出新组件
      const newCompont = cloneDeep(com);
      if (!newCompont) return;
      draft.copiedComponent = newCompont;
    }),
    // 粘贴组件
    pastComponent: produce((draft: CompontesSteteType) => {
      const { copiedComponent } = draft;
      if (!copiedComponent) return;
      copiedComponent.fe_id = nanoid(); // 重新生成fe_id, 防止重复
      newSelectedComponent(draft, copiedComponent);
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: CompontesSteteType) => {
      const { selected, componentList } = draft;
      const comIndex = componentList.findIndex((i) => i.fe_id === selected);
      if (comIndex < 0) return;
      if (comIndex <= 0) return; // 已经选中第一个无法上移动
      draft.selected = componentList[comIndex - 1].fe_id;
    }),
    // 选中下一个
    selectNextComponent: produce((draft: CompontesSteteType) => {
      const { selected, componentList } = draft;
      const comIndex = componentList.findIndex((i) => i.fe_id === selected);
      if (comIndex < 0) return;
      if (comIndex + 1 == componentList.length) return; // 已经选中第一个无法上移动
      draft.selected = componentList[comIndex + 1].fe_id;
    }),
    // 修改标题
    updateComponentTitle: produce(
      (draft: CompontesSteteType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { componentList } = draft;
        const { fe_id, title } = action.payload;
        const com = componentList.find((item) => item.fe_id == fe_id);
        if (com) {
          com.title = title;
        }
      }
    ),
    // 拖拽修改
    moveComponent: produce(
      (
        draft: CompontesSteteType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: oldComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;
        draft.componentList = arrayMove(oldComponentList, oldIndex, newIndex);
      }
    ),
  },
});

export const {
  resetCompentents,
  setSelected,
  addComponent,
  updatePropsComponent,
  deleteComponent,
  hiddenComponent,
  lockComponent,
  copyComponent,
  pastComponent,
  selectPrevComponent,
  selectNextComponent,
  updateComponentTitle,
  moveComponent,
} = compontesReducer.actions;
export default compontesReducer.reducer;
