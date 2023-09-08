import Component from './Components';
import PropComponent from './PropComponent';
import { questionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '标题',
  type: 'questionTitle', // 组件的类型 要前后端统一
  Component, // 在画布显示的组件
  PropComponent, // 在右侧属性显示的组件
  defaulrProps: questionTitleDefaultProps, // 新增时的默认属性
};
