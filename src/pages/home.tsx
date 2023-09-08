import React, { FC } from 'react';
import { Typography, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Title, Paragraph } = Typography;
import styles from './home.module.scss';
import { MANGE_LIST_PATHNAME } from '../router';

const Home: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查（） | 在线投票「」</Title>
        <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            nav(MANGE_LIST_PATHNAME);
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
