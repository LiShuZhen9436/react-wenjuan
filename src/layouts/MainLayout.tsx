import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../commponents/Logo';
import UseInfo from '../commponents/UseInfo';
import { Spin } from 'antd';
import useLoadUserDate from '../hooks/userLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
  // 获取用户信息
  const { waiting } = useLoadUserDate();
  console.log('waiting:', waiting);
  // 当前的状态
  useNavPage(waiting);
  return (
    <>
      <Layout>
        <Header className={styles.head}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UseInfo />
          </div>
        </Header>
        <Layout className={styles.main}>
          <Content>
            {waiting ? (
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Spin />
              </div>
            ) : (
              // 路由
              <Outlet></Outlet>
            )}
          </Content>
        </Layout>
        <Footer className={styles.footer}>@@2657881055@qq.com</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
