/**
 * 中间 组件展示区
 */

import React, { FC, MouseEvent, useState } from 'react';
import { Spin } from 'antd';
import styles from './CommitList.module.scss';
// import QuestionTitle from '../../../commponents/QuestionCompnents/QuestionTitle/Components';
// import QuestionInput from '../../../commponents/QuestionCompnents/QuestionInput/Components';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import { components } from '../../../commponents/QuestionCompnents';
import { ComponentInfoType } from '../../../store/componentsReducer';
import classnames from 'classnames';
import useBindCanvasPress from '../../../hooks/useBindCanvasPress';

type propType = {
  selectComponentId: string;
  setSelectComponentId: (fe_id: string) => void;
  setSelectComponentType: (type: string) => void;
};
// 根据组件类型获取组件
function getComponentByType(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const { Component } = components(type) || {};
  if (!Component) return null;
  return <Component {...props} />;
}
const CommitList: FC<propType> = (props) => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } = props;
  useBindCanvasPress();
  // 从redux中获取组件
  const { componentList, selected } = useGetComponentsInfo() || [];
  return (
    // 过滤调隐藏的组件
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
              [styles.selected]: selectComponentId === fe_id,
              [styles.lock]: isLocked,
            });
            return (
              <div
                key={fe_id}
                className={selectedclass}
                onClick={() => {
                  setSelectComponentId(fe_id);
                  setSelectComponentType(type);
                }}
              >
                {/* 动态获取显示组件 */}
                <div className={styles.component}> {getComponentByType(item)}</div>
              </div>
            );
          })}
    </div>
  );
};
export default CommitList;
