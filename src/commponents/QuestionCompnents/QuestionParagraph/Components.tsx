// 画布展示的组件

import React, { FC } from 'react';
// 组件接收的参数类型，和默认属性值
import { questionParagraphProps, questionParagraphDefaultProps } from './interface';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const Component: FC<questionParagraphProps> = (props: questionParagraphProps) => {
  const { text = '', isCenter } = { ...questionParagraphDefaultProps, ...props };
  // 解决不换行问题
  // const t = text.replaceAll('\n', '<br>');
  const textAry = text.split('\n');
  return (
    <div>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
        {/* <span dangerouslySetInnerHTML={{ __html: t }}></span> */}
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
