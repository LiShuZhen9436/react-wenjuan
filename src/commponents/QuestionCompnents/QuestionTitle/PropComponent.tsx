/**
 * 标题的属性prop组件
 */

import React, { FC, useEffect } from 'react';
import { questionTitleProps } from './interface';
import { Checkbox, Form, Input, Select } from 'antd';

const PropComponent: FC<questionTitleProps> = (props: questionTitleProps) => {
  const { text, lervel, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, lervel, isCenter });
  }, [text, lervel, isCenter]);

  function changeValues() {
    // console.log('values:', form.getFieldsValue());
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
        initialValues={{ text, lervel, isCenter }}
        onValuesChange={changeValues}
      >
        <Form.Item
          label="标题内容"
          name="text"
          rules={[{ required: true, message: '请输入标题内容' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="层级" name="lervel">
          <Select
            options={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3 },
            ]}
            value={lervel}
          ></Select>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>是否居中</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropComponent;
