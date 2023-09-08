import Component from './Component';
import PropComponent from './PropComponent';
import { questionInfoDefauleProp } from './interface';

export * from './interface';

export default {
  title: '问卷标题',
  type: 'QuestionInfo',
  Component, // 在画布显示的组件
  PropComponent, // 在右侧属性显示的组件
  defaulrProps: questionInfoDefauleProp, // 新增时的默认属性
};
