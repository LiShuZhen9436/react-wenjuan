import React, { FC, useEffect } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, Space, Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../router';
import styles from './Login.module.scss';
import { userLogin } from '../axios/user';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { MANGE_LIST_PATHNAME } from '../router';
import { setToken } from '../untils/user_token';

const { Title } = Typography;

function remberInfo(values: any) {
  localStorage.setItem('username', values.username);
  localStorage.setItem('password', values.password);
}
function delImfo() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
}
function getInfo() {
  return {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  };
}

const Login: FC = () => {
  // 首次进入判断是否有用户名密码 有则显示
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getInfo();
    form.setFieldsValue({ username, password });
  }, []);

  const nav = useNavigate();
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await userLogin(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        setToken(res.token);
        console.log('res:', res);
        message.success('登陆成功！');
        nav(MANGE_LIST_PATHNAME);
      },
    }
  );
  const onFinish = (values: any) => {
    const { username, password } = values;
    run(username, password);
    if (values.remember) {
      // 用户勾选了记住我
      remberInfo(values);
    } else {
      delImfo();
    }
  };
  return (
    <div className={styles.lcontent}>
      <Title>
        <Space>
          <UserAddOutlined />
          用户登录
        </Space>
      </Title>
      <div>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
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

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
