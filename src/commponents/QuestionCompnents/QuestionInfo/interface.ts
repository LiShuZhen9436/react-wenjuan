export type questionIntoProps = {
  title?: string;
  desc?: string;
  onChange?: (values: questionIntoProps) => void;
  disabled?: boolean;
};

export const questionInfoDefauleProp: questionIntoProps = {
  title: '问卷标题',
  desc: '描述',
};
