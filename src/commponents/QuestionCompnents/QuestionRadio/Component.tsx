import React, { FC } from 'react';
import { Typography, Radio, Space } from 'antd';
import { questionRadioProps, questionRadioDefauleProps } from './interface';

const { Paragraph } = Typography;
const Component: FC<questionRadioProps> = (props: questionRadioProps) => {
  const { title, value, isVertical, options } = { ...questionRadioDefauleProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.length > 0 &&
            options.map((item, index) => {
              return (
                <Radio key={index} value={item.value}>
                  {item.text}
                </Radio>
              );
            })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
