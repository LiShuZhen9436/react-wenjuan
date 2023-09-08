/**
 * 面板 左侧的组件库
 */

import React, { FC } from 'react';

import { componentsConfigGroup, componentsConfType } from '../../../commponents/QuestionCompnents';
import { Typography } from 'antd';
import styles from './CommonentsLib.module.scss';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/componentsReducer';
import { nanoid } from 'nanoid';

const { Title } = Typography;
const CommonentsLib: FC = () => {
  const dispath = useDispatch();

  // 组件的点击事件
  function handelClick(component: componentsConfType) {
    const { title, type, defaulrProps } = component;
    const fe_id = nanoid();
    dispath(addComponent({ fe_id, type, title, props: defaulrProps }));
  }

  // 获取单个组件
  function getComp(com: componentsConfType) {
    const { title, type, Component } = com;
    return (
      <div
        onClick={() => {
          handelClick(com);
        }}
        key={type}
        className={styles['wrapper']}
      >
        <div className={styles['component']}>
          <Component />
        </div>
      </div>
    );
  }
  return (
    <div>
      {componentsConfigGroup.map((group, index) => {
        const { groupid, groupName, components } = group;
        return (
          <div key={groupid}>
            {/* 显示组件库 标题 */}
            <Title level={3} style={{ fontSize: '16px', marginTop: index == 0 ? '0' : '15px' }}>
              {groupName}
            </Title>

            <div>
              {components.map((com) => {
                return getComp(com);
              })}
            </div>
            {/* 显示组件库 对应组件 */}
          </div>
        );
      })}
    </div>
  );
};

export default CommonentsLib;
