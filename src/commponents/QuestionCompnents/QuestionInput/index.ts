import Component from './Components';
import PropComponent from './PropComponent';
import { questionInputDefaultProps } from './interface';

export * from './interface';

// 组件的配置
export default {
  title: '输入框',
  type: 'questionInput', // 组件的类型 要前后端统一
  Component,
  PropComponent, // 右侧 属性组件
  defaulrProps: questionInputDefaultProps,
};
