import React, { FC } from 'react';
import { AppstoreAddOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import CommonentsLib from './CommonentsLib';
import Layers from './Layers';

const LeftPanel: FC = () => {
  const panelAry = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <CommonentsLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarcodeOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={panelAry} />
    </>
  );
};

export default LeftPanel;
