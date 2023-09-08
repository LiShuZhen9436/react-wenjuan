/**
 * 右侧面板  属性组件
 */
import React, { FC } from 'react';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import { components, componentsPropsType } from '../../../commponents/QuestionCompnents';
import { updatePropsComponent } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';

// 定义一个提示空的组件
const NoProp: FC = () => {
  return <div>未选中组件</div>;
};
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  // 当前选中的组件
  const { selectedComponent } = useGetComponentsInfo();
  if (selectedComponent == null) return <NoProp />;
  //   获取组件类型 和redux中存储的组件的属性值
  const { fe_id, type, props, isLocked, isHidden } = selectedComponent;
  //   获取在页面上展示的 组件页面
  const componentConf = components(type);
  if (componentConf == null) return <NoProp />;
  //   获取属性组件
  const { PropComponent } = componentConf;
  function onChange(changedValues: componentsPropsType) {
    // console.log('changedValues:', changedValues);
    dispatch(updatePropsComponent({ fe_id, values: changedValues }));
  }
  //   返回属性组件 渲染在页面上 组件时锁定或隐藏时 组件属性面板静止点击
  return <PropComponent {...props} onChange={onChange} disabled={isLocked || isHidden} />;
};

export default ComponentProp;
