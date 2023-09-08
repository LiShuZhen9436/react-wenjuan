import React, { FC, useEffect } from 'react';
import { Form, Input, Checkbox, Select, Space, Button } from 'antd';
import { questionRadioProps, questionRadioDefauleProps, optionType } from './interface';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const PropComponent: FC<questionRadioProps> = (props: questionRadioProps) => {
  const { title, value, isVertical, options, onChange, disabled } = {
    ...questionRadioDefauleProps,
    ...props,
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, value, isVertical, options });
  }, [title, value, isVertical, options]);
  function handelChange() {
    if (onChange) {
      const newValues = form.getFieldsValue();
      if (newValues.options) {
        newValues.options.filter((item: any) => !(item.value == null));
      }
      const { options = [] } = newValues;
      options.forEach((opt: any) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });
      onChange(newValues);
    }
  }
  return (
    <Form
      disabled={disabled}
      layout="vertical"
      form={form}
      initialValues={{ title, value, isVertical, options }}
      onValuesChange={handelChange}
    >
      <Form.Item
        label="单选标题"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前项输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: optionType) => {
                              if (opt.text == text) {
                                num++; // 记录text 相同的个数，预计只有一个(自己)
                              }
                            });
                            if (num > 1) return Promise.reject(new Error('和其他选项重复'));
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项..." />
                    </Form.Item>
                    {/* 当前项删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    )}
                  </Space>
                );
              })}

              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add({ text: '', lable: '' });
                  }}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ value, text }) => {
            return { value, label: text };
          })}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
