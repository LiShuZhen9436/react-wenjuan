import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import { Typography, Empty, Table, Tag, Button, Space, Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ListSearch from '../../commponents/ListSearch';
import searchQuestionList from '../../hooks/useLoadSearchQuestionData';
import { Spin } from 'antd';
import PaginationCom from '../../commponents/PaginationCom';
import { useRequest } from 'ahooks';
import { getQuestionStarList, deleteQuestion } from '../../axios/question';

// 表格的列
const columns = [
  {
    title: '问卷',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return <Tag color={isPublished ? 'geekblue' : ''}>{isPublished ? ' 已发布' : '未发布'}</Tag>;
    },
  },
  {
    title: '回答数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
];
const { Title } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {
  // const [questionList] = useState(rawQuestionList);

  const { data = {}, loading, error, refresh } = searchQuestionList({ isDelete: true }); //查询删除列表
  const { list: questionList = [], total = 0 } = data || {};
  // 定义rowSelectionAry为字符串数组类型
  const [rowSelectionAry, setRowSelectionAry] = useState<string[]>([]);

  // 恢复
  const { run: restoreCkick } = useRequest(
    async () => {
      for (let i = 0; i < rowSelectionAry.length; i++) {
        const id = rowSelectionAry[i];
        await getQuestionStarList(id, { isDelete: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功！');
        refresh(); // 刷新列表
        setRowSelectionAry([]); // 重置选中的数组项
      },
    }
  );

  // 彻底删除
  const { run: deleteClick } = useRequest(
    async () => {
      await deleteQuestion(rowSelectionAry);
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('删除成功！');
        refresh(); // 刷新列表
        setRowSelectionAry([]); // 重置选中的数组项
      },
    }
  );

  function del() {
    confirm({
      title: '确认删除吗',
      icon: <ExclamationCircleFilled />,
      content: '删除后不可找回?',
      onOk: deleteClick,
      cancelText: '取消',
      okText: '确认',
    });
  }
  const tableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={rowSelectionAry.length <= 0} onClick={restoreCkick}>
          恢复
        </Button>
        <Button type="default" disabled={rowSelectionAry.length <= 0} onClick={del}>
          删除
        </Button>
      </Space>
      <Table
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey={'_id'}
        rowSelection={{
          type: 'checkbox',
          onChange: (selKeys) => {
            // as 转换为字符串数组类型
            setRowSelectionAry(selKeys as string[]);
          },
        }}
      />
    </>
  );
  return (
    <div>
      <div className={styles.title}>
        <Title level={3}>回收站</Title>
        <div className={styles.right}>
          {' '}
          <ListSearch />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div>
      {!loading && questionList.length == 0 ? <Empty description="暂无数据！" /> : ''}
      {questionList.length > 0 && tableElem}
      <div className={styles.footer}>
        <PaginationCom total={total}></PaginationCom>
      </div>
    </div>
  );
};

export default Trash;
