/**
 * checkouBox 组件 在画布 左侧和中间展示
 */
import React, { FC } from 'react';
import { Typography, Checkbox, Space } from 'antd';
import { questionPropsType, questionDefauleProps } from './interface';

const { Paragraph } = Typography;
const Component: FC<questionPropsType> = (props: questionPropsType) => {
  const { title, value, isVertical, options } = { ...questionDefauleProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {options.map(({ text, value, isChecked }) => {
          return (
            <Checkbox checked={isChecked} key={value} value={value}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
