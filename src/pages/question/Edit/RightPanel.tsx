/**
 * 右侧属性面板
 */

import React, { FC, useEffect, useState } from 'react';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';

// ts 枚举
enum changeType {
  CHANGE_PROP = 'prop',
  CHANGE_SETTING = 'setting',
}

const RightPanel: FC = () => {
  const { selected } = useGetComponentsInfo();
  const [changeState, setChangestate] = useState(changeType.CHANGE_PROP);
  // 监听selected的变化，有选中的组件，则面板选中属性面板，否则选中页面设置面板
  useEffect(() => {
    if (selected) {
      setChangestate(changeType.CHANGE_PROP);
    } else {
      setChangestate(changeType.CHANGE_SETTING);
    }
  }, [selected]);
  const panelAry = [
    {
      key: changeType.CHANGE_PROP,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: (
        <div>
          <ComponentProp />
        </div>
      ),
    },
    {
      key: changeType.CHANGE_SETTING,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={changeState} items={panelAry}></Tabs>;
};

export default RightPanel;
