/**
 * 组件的属性 的ts类型
 */
export type quertionTextAreaProps = {
  title?: string;
  placeholder?: string;
  onChange?: (values: quertionTextAreaProps) => void;
  disabled?: boolean;
};
export const questionTextAreaDefaultProps: quertionTextAreaProps = {
  title: '多行输入标题',
  placeholder: '请输入...',
};
