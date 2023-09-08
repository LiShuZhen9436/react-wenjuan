import React, { FC } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, Space, Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import styles from './Login.module.scss';
import { userRegister } from '../axios/user';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const Register: FC = () => {
  const nav = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values;
      const data = await userRegister(username, password, nickname);
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功');
        nav(LOGIN_PATHNAME);
      },
    }
  );

  const onFinish = (values: any) => {
    run(values);
  };

  return (
    <div className={styles.lcontent}>
      <Title>
        <Space>
          <UserAddOutlined />
          用户注册
        </Space>
      </Title>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5-20之间!',
              },
              {
                pattern: /^\w+$/,
                message: '只能是数字字母下划线!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          {/* dependencies 依赖的值 password 发生变化时触发当前组件的 */}
          <Form.Item
            label="确认密码"
            name="aginPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // value 当前确认密码输入的值; getFieldValue('password') 获取密码框输入的值
                  if (value === getFieldValue('password')) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('两次密码不一致！'));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号,去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
