// 属性组件
import React, { FC, useEffect } from 'react';
import { Form, Checkbox, Input } from 'antd';
import { questionParagraphProps, questionParagraphDefaultProps } from './interface';

const { TextArea } = Input;
const PropComponent: FC<questionParagraphProps> = (props: questionParagraphProps) => {
  const [form] = Form.useForm();
  const { text, isCenter, onChange, disabled } = { ...questionParagraphDefaultProps, ...props };

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);

  function changeValues() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      disabled={disabled}
      layout="vertical"
      form={form}
      initialValues={{ text, isCenter }}
      onValuesChange={changeValues}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
