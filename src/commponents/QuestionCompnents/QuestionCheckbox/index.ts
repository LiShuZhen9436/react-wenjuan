// checkbox 相关组件
import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

// 组件的默认属性值
import { questionDefauleProps } from './interface';

// ts类型
export * from './interface';

export default {
  title: '多选标题',
  type: 'questionCheckbox', // 组件的类型 标识 要前后端统一
  Component, // 在画布显示的组件
  PropComponent, // 在右侧属性显示的组件
  StatComponent, // 图表组件
  defaulrProps: questionDefauleProps, // 新增时的默认属性
};
