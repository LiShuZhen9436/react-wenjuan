/**
 * 标题组件（如问卷的标题） 画布上展示
 */
import React, { FC } from 'react';
import { questionTitleProps, questionTitleDefaultProps } from './interface';
import { Typography } from 'antd';

const { Title } = Typography;
const QuestionTitle: FC<questionTitleProps> = (props: questionTitleProps) => {
  const { text, lervel = 1, isCenter } = { ...questionTitleDefaultProps, ...props };

  function fontSize(lervel: number) {
    if (lervel == 1) return '20px';
    if (lervel == 2) return '15px';
    if (lervel == 3) return '10px';
  }
  return (
    <div>
      <Title
        level={lervel}
        style={{
          fontSize: fontSize(lervel),
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        {text}
      </Title>
    </div>
  );
};

export default QuestionTitle;
