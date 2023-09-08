/**
 * ts 类型
 * 标题组件
 */

// title的属性
export type questionTitleProps = {
  text?: string;
  lervel?: 1 | 2 | 3;
  isCenter?: boolean; // 是否居中
  onChange?: (values: questionTitleProps) => void;
  disabled?: boolean;
};

// 属性默认值
export const questionTitleDefaultProps: questionTitleProps = {
  text: '一行标题',
  lervel: 1,
  isCenter: false,
};
