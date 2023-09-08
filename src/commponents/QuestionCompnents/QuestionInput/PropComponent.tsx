/**
 * 右侧 显示属性的组件
 */

import React, { FC, useEffect } from 'react';
import { quertionInputProps } from './interface';
import { Form, Input } from 'antd';

const PropComponent: FC<quertionInputProps> = (props: quertionInputProps) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function hanelChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <div>
      <Form
        disabled={disabled}
        layout="vertical"
        form={form}
        initialValues={{ title, placeholder }}
        onValuesChange={hanelChange}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="placeholder" name="placeholder">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropComponent;
