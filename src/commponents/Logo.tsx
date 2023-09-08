/**
 * 登录页左上角的 小慕问卷 文字
 */
import React, { FC, useEffect, useState } from 'react';
import { Typography, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { HOME_PATHNAME, MANGE_LIST_PATHNAME } from '../router';

const { Title } = Typography;
const Logo: FC = () => {
  // 点击的时候 判断当前是否存在用户信息 存在跳转到问卷页面，不存在则跳转到根目录
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME); // 默认赋值为跟目录
  useEffect(() => {
    if (username) {
      setPathname(MANGE_LIST_PATHNAME);
    }
  }, [username]);
  return (
    <div className={styles.logo}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
