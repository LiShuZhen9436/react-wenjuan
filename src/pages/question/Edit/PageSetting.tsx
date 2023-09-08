import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import getPageInfo from '../../../hooks/useGetPageInfo';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const { TextArea } = Input;
const PageSetting: FC = () => {
  const pageInfo = getPageInfo(); // 从redux中获取page的配置信息
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //   console.log('pageInfo@@:', pageInfo);
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);
  function hanelChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  return (
    <Form layout="vertical" form={form} initialValues={pageInfo} onValuesChange={hanelChange}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="脚本片段" name="js">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="样式描述" name="css">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
