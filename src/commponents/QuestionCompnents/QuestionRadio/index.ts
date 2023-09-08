import Component from './Component';
import PropComponent from './PropComponent';
import { questionRadioDefauleProps } from './interface';
import StatComponent from './StatComponent';

export * from './interface';

export default {
  title: '标题',
  type: 'questionRadio', // 组件的类型 要前后端统一
  Component, // 在画布显示的组件
  PropComponent, // 在右侧属性显示的组件
  defaulrProps: questionRadioDefauleProps, // 新增时的默认属性
  StatComponent, // 统计组件
};
