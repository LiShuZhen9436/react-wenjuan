/**
 * 我的问卷 卡片组件
 */
import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  DeleteOutlined,
  CopyOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionStarList, getQuestionCopyList } from '../axios/question';

// 自定义ts类型
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  isDelete?: boolean;
  // ? 表示可选参数（可传可不传）
  // delQuestions?: (id: string) => void;
  // faBUQuestion?: (id: string) => void;
};
const QuestionCard: FC<PropsType> = (props) => {
  const nav = useNavigate();
  const { _id, answerCount, createdAt, title, isPublished, isStar, isDelete } = props;
  const [isSart1, setIsSart1] = useState(isStar);
  const [isDel1, setIsDel1] = useState(false);
  const { confirm } = Modal;

  // 标星
  const { run: starChange, loading: starLoading } = useRequest(
    async () => {
      const data = await getQuestionStarList(_id, { isStar: !isStar });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        setIsSart1(!isSart1);
        message.success('设置成功！');
      },
    }
  );

  // 删除 和标星调用一样的接口只是传的参数不同
  const { run: delChange, loading: delLoading } = useRequest(
    async () => {
      const data = await getQuestionStarList(_id, { isDelete: true });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        setIsDel1(!isDelete);
        message.success('删除成功！');
      },
    }
  );
  // 复制
  const { run: copyChange, loading: copyLoading } = useRequest(
    async () => {
      const data = await getQuestionCopyList(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        nav(`/question/edit/${res.id}`);
      },
    }
  );
  function confirmClick() {
    copyChange();
  }
  function delItem() {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除吗？.',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        delChange();
      },
    });
  }

  if (isDel1) return null;
  return (
    <div key={_id} className={styles['list-item']}>
      {/* card 上 */}
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            {isSart1 ? <StarOutlined style={{ color: 'red' }} /> : ''}
            {title}
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            <Tag color={isPublished ? 'geekblue' : ''}>{isPublished ? ' 已发布' : '未发布'}</Tag>
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: 15 }}></Divider>
      {/* card 下 */}
      <div className={styles['content-btn']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                nav(`/question/edit/${_id}`);
              }}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              onClick={() => {
                nav(`/question/stat/${_id}`);
              }}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>

        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={starChange}
              disabled={starLoading}
            >
              {isSart1 ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="提示"
              description="确定复制该问卷吗？"
              onConfirm={confirmClick}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={copyLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={delItem}
              disabled={delLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
