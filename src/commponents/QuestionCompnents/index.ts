import { FC } from 'react';
import QuestionInputConfig, { quertionInputProps } from './QuestionInput';
import QuestionTitleConfig, { questionTitleProps } from './QuestionTitle';
import QuestionParagraphConfig, { questionParagraphProps } from './QuestionParagraph';
import QuestionInfoConfig, { questionIntoProps } from './QuestionInfo';
import QuestionTextAreaConfig, { quertionTextAreaProps } from './QuestionTextArea';
import QuestionRadioConfig, {
  questionRadioProps,
  QuestionRadioStatPropsType,
} from './QuestionRadio';

import QuestionCheckboxConfig, {
  questionPropsType,
  QuestionCheckboxStatPropsType,
} from './QuestionCheckbox';

// 统一 各个组件的prop type
export type componentsPropsType = quertionInputProps &
  questionTitleProps &
  questionParagraphProps &
  questionIntoProps &
  quertionTextAreaProps &
  questionRadioProps &
  questionPropsType;

// 统一各组件的统计图表属性类型
export type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

// 统一 组件的配置
export type componentsConfType = {
  title: string;
  type: string; // 组件的类型 要前后端统一
  Component: FC<componentsPropsType>;
  PropComponent: FC<componentsPropsType>;
  defaulrProps: componentsPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
};

// 全部组件配置列表
const componentsConfigList: componentsConfType[] = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextAreaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
];

// 根据组件类型 产需组件配置
export function components(type: string) {
  return componentsConfigList.find((c) => c.type === type);
}

// 组件分组
export const componentsConfigGroup = [
  {
    groupid: 'titleGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionParagraphConfig, QuestionInfoConfig],
  },
  {
    groupid: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig, QuestionTextAreaConfig],
  },
  {
    groupid: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
];
