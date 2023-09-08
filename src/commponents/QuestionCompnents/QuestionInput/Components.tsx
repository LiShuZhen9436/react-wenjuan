/**
 * input 组件 画布上面展示
 */
import React, { FC } from 'react';
import { quertionInputProps, questionInputDefaultProps } from './interface';
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;
const QuestionInput: FC<quertionInputProps> = (props: quertionInputProps) => {
  const { title, placeholder } = { ...questionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
