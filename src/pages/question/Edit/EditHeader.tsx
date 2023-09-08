import React, { FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import { useDispatch } from 'react-redux';
import { updatePageInfoTitle } from '../../../store/pageInfoReducer';
import getPageInfo from '../../../hooks/useGetPageInfo';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import { getQuestionStarList } from '../../../axios/question';
import { useRequest, useDebounceEffect } from 'ahooks';
import { useParams } from 'react-router-dom';
import { useKeyPress } from 'ahooks';

const { Title } = Typography;
// 定义头部组件
const HeadElem: FC = () => {
  const dispatch = useDispatch();
  const { title = '' } = getPageInfo();
  const [editState, changeEditState] = useState(false);
  function valChange(e: any) {
    const newVal = e.target.value.trim();
    dispatch(updatePageInfoTitle({ title: newVal }));
  }
  // 编辑状态显示input
  if (editState) {
    return (
      <Input
        value={title}
        onChange={valChange}
        onPressEnter={() => {
          changeEditState(false);
        }}
        onBlur={() => {
          changeEditState(false);
        }}
      />
    );
  }
  // 非编辑状态展示的组件
  return (
    <div>
      <Space>
        <div>{title}</div>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            changeEditState(true);
          }}
        ></Button>
      </Space>
    </div>
  );
};

// 保存
const SaveBtnElem: FC = () => {
  const { id = '' } = useParams();
  const pageInfo = getPageInfo();
  const { componentList } = useGetComponentsInfo();
  const { loading, run } = useRequest(
    async () => {
      const res = await getQuestionStarList(id, { ...componentList, ...pageInfo });
      return res;
    },
    { manual: true }
  );
  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (loading) return;
    run();
  });
  // 自动保存 使用ahook的防抖effect
  useDebounceEffect(
    () => {
      run();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  );
  return (
    <div>
      <Button disabled={loading} icon={loading ? <LoadingOutlined /> : null} onClick={run}>
        保存
      </Button>
    </div>
  );
};
// 发布组件
const PublicElem: FC = () => {
  const { id = '' } = useParams();
  const pageInfo = getPageInfo();
  const { componentList } = useGetComponentsInfo();
  const nav = useNavigate();
  const { loading, run: publics } = useRequest(
    async () => {
      const res = await getQuestionStarList(id, {
        ...componentList,
        ...pageInfo,
        isPunlices: true,
      });
      return res;
    },
    {
      manual: true,
      onSuccess: function () {
        nav(`/question/stat/${id}`);
      },
    }
  );
  return (
    <Button
      type="primary"
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
      onClick={publics}
    >
      发布
    </Button>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>
              <HeadElem />
            </Title>
          </Space>
        </div>
        <div className={styles.content}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveBtnElem />
            <PublicElem />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
