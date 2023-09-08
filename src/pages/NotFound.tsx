import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MANGE_LIST_PATHNAME } from '../router';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.content}>
      <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的页面不存在!"
        extra={
          <Button
            type="primary"
            onClick={() => {
              nav(MANGE_LIST_PATHNAME);
            }}
          >
            返回首页
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
