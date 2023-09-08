import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { questionIntoProps, questionInfoDefauleProp } from './interface';

const { TextArea } = Input;
const PropComponent: FC<questionIntoProps> = (props: questionIntoProps) => {
  const { title, desc, onChange, disabled } = { ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);
  function changeValues() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      initialValues={{ title, desc }}
      onValuesChange={changeValues}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
