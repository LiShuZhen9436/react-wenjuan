/**
 * 当前组件的配置
 */
import Component from './Components';
import { questionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '段落',
  type: 'questionParagraph', // 组件的类型 要前后端统一
  Component, // 在画布显示的组件
  PropComponent, // 在右侧属性显示的组件
  defaulrProps: questionParagraphDefaultProps, // 新增时的默认属性
};
