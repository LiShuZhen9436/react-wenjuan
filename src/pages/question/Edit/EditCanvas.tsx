/**
 * 中间 组件展示区
 */

import React, { FC, MouseEvent } from 'react';
import { Spin } from 'antd';
import styles from './EditCanvas.module.scss';
// import QuestionTitle from '../../../commponents/QuestionCompnents/QuestionTitle/Components';
// import QuestionInput from '../../../commponents/QuestionCompnents/QuestionInput/Components';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import { components } from '../../../commponents/QuestionCompnents';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { setSelected } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import useBindCanvasPress from '../../../hooks/useBindCanvasPress';
import SortableContainer from '../../../commponents/DragSortable/SortableContainer';
import SortableItem from '../../../commponents/DragSortable/SortableItem';
import { moveComponent } from '../../../store/componentsReducer';

type propType = {
  loading: boolean;
};
// 根据组件类型获取组件
function getComponentByType(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const { Component } = components(type) || {};
  if (!Component) return null;
  return <Component {...props} />;
}
const EditCanvas: FC<propType> = (props: propType) => {
  const { loading } = props;
  useBindCanvasPress();
  const dispatch = useDispatch();
  // 点击时 组件项的id保存到redux
  function handelClick(event: MouseEvent, fe_id: string) {
    event.stopPropagation(); // 取消冒泡
    dispatch(setSelected(fe_id));
  }
  // 从redux中获取组件
  const { componentList, selected } = useGetComponentsInfo() || [];

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  // SortableContainer 组件需要id属性
  const newComponentList = componentList.map((i) => {
    return { ...i, id: i.fe_id };
  });

  function onDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    // 过滤调隐藏的组件
    <SortableContainer items={newComponentList} onDragEnd={onDragEnd}>
      <div className={styles.canvas}>
        {componentList.length > 0 &&
          componentList
            .filter((i) => !i.isHidden)
            .map((item: any) => {
              // 给选中的组件项添加边框样式
              const { fe_id, type, isLocked } = item;
              const wrapperclass = styles['component-wrapper'];
              const selectedclass = classnames({
                [wrapperclass]: true,
                [styles.selected]: selected === fe_id,
                [styles.lock]: isLocked,
              });
              return (
                <SortableItem key={fe_id} id={fe_id}>
                  <div
                    className={selectedclass}
                    onClick={(e) => {
                      handelClick(e, fe_id);
                    }}
                  >
                    {/* 动态获取显示组件 */}
                    <div className={styles.component}> {getComponentByType(item)}</div>
                  </div>
                </SortableItem>
              );
            })}
        {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
      </div>
    </SortableContainer>
  );
};
export default EditCanvas;
