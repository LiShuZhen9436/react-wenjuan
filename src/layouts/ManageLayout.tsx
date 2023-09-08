import React, { FC, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Space, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, BarsOutlined, StarOutlined } from '@ant-design/icons';
import style from './ManageLayout.module.scss';
import { addQuestion } from '../axios/question';
import { ResDataType } from '.././axios/Ajax';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
  const nav = useNavigate(); // 路由跳转
  const pathname = useLocation().pathname; // 获取当前路由地址

  // const [loading, setLoading] = useState(false);
  // async function handleAddClick() {
  //   setLoading(true);
  //   const data = (await addQuestion()) as ResDataType;
  //   const { id } = data;
  //   nav(`/question/edit/${id}`);
  //   setLoading(false);
  // }

  // 使用第三方hooks改造
  const { loading, run: handleAddClick } = useRequest(addQuestion, {
    manual: true, // 设置为true 则 useRequest 不会默认执行，需要通过 run 来触发执行
    onSuccess: (res: ResDataType) => {
      const { id } = res;
      nav(`/question/edit/${id}`);
    },
  });

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 0 }} />
          <Button
            size="large"
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list');
            }}
          >
            我的问卷
          </Button>
          <Button
            size="large"
            type={pathname.startsWith('/manage/start') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/start');
            }}
          >
            星标问卷
          </Button>
          <Button
            size="large"
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/trash');
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={style.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ManageLayout;
