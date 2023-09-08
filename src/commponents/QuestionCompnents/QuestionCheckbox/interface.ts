/**
 * checkBox的相关类型
 */
export type optionType = {
  text?: string;
  value?: string;
  isChecked?: boolean;
};

export type questionPropsType = {
  title?: string;
  value?: string;
  isVertical?: boolean;
  options?: optionType[];
  // onChange 组件属性的修改事件 (当通过组件右侧的表单修改组件时 触发change事件，修改redux中的数据)
  onChange?: (values: questionPropsType) => void;
  disabled?: boolean;
};

export const questionDefauleProps = {
  title: '多选框标题',
  value: '',
  isVertical: false,
  options: [
    {
      text: '选项一',
      value: 'item1',
      isChecked: true,
    },
    {
      text: '选项2',
      value: 'item2',
      isChecked: false,
    },
  ],
};

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
