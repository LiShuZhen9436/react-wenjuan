/**
 * 组件的属性 的ts类型
 */
export type quertionInputProps = {
  title?: string;
  placeholder?: string;
  onChange?: (values: quertionInputProps) => void;
  disabled?: boolean;
};
export const questionInputDefaultProps: quertionInputProps = {
  title: '输入框标题',
  placeholder: '请输入...',
};
