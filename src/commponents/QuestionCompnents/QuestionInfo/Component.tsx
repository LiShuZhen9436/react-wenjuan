/**
 * 问卷标题 画布中间、左侧展示组件
 */
import React, { FC } from 'react';
import { Typography } from 'antd';
import { questionIntoProps, questionInfoDefauleProp } from './interface';

const { Title } = Typography;
const { Paragraph } = Typography;
const Component: FC<questionIntoProps> = (props: questionIntoProps) => {
  const { title, desc = '' } = { ...questionInfoDefauleProp, ...props };
  const textAry = desc.split('\n');
  return (
    <div>
      <Title level={1} style={{ fontSize: '20px', textAlign: 'center' }}>
        {title}
      </Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '0' }}>
        {textAry.map((i, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {i}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default Component;
