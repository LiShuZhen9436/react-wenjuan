/**
 * 定义组件参数类型
 * 默认属性值
 */
export type questionParagraphProps = {
  text?: string;
  isCenter?: boolean; // 是否居中
  onChange?: (values: questionParagraphProps) => void;
  disabled?: boolean;
};

// 属性默认值
export const questionParagraphDefaultProps: questionParagraphProps = {
  text: '一行段落',
  isCenter: false,
};
