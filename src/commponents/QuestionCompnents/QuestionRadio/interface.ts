export type optionType = {
  text?: string;
  value?: string;
};
export type questionRadioProps = {
  title?: string;
  value?: string;
  isVertical?: boolean;
  options?: optionType[];
  onChange?: (values: questionRadioProps) => void;
  disabled?: boolean;
};

export const questionRadioDefauleProps = {
  title: '单选标题',
  value: '', // 默认选中值
  isVertical: false, // 是否纵向显示
  options: [
    {
      value: 'item1',
      text: '选项1',
    },
    {
      value: 'item2',
      text: '选项2',
    },
    {
      value: 'item3',
      text: '选项3',
    },
  ],
};

export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
