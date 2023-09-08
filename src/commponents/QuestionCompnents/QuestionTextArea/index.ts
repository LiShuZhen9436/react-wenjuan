import Component from './Component';
import PropComponent from './PropComponent';
import { questionTextAreaDefaultProps } from './interface';

export * from './interface';

// 组件的配置
export default {
  title: '多行输入框',
  type: 'questionTextArea', // 组件的类型 要前后端统一
  Component,
  PropComponent, // 右侧 属性组件
  defaulrProps: questionTextAreaDefaultProps,
};
