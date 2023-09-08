/**
 * textArea 组件 画布上面展示
 */
import React, { FC } from 'react';
import { quertionTextAreaProps, questionTextAreaDefaultProps } from './interface';
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;
const QuestionInput: FC<quertionTextAreaProps> = (props: quertionTextAreaProps) => {
  const { title, placeholder } = { ...questionTextAreaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionInput;
