import React, { FC, useRef } from 'react';
import styles from './StatHeader.module.scss';
import { Button, Typography, Space, Tooltip, InputRef, message, Input, Popover } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import getPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

const { Title } = Typography;
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title, isPublished } = getPageInfo();
  const { id } = useParams();

  const urlElem = useRef<InputRef>(null);
  function copy() {
    const elem = urlElem.current;
    if (elem == null) return;
    elem.select();
    document.execCommand('copy'); // 拷贝
    message.success('拷贝成功');
  }
  const getelem = () => {
    if (!isPublished) return;
    const url = `http://localhost:3000/question/${id}`;
    const qrcodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );
    return (
      <Space>
        <Input ref={urlElem} style={{ width: '300px' }} value={url} />
        <Tooltip title="拷贝">
          <Button type="text" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={qrcodeElem}>
          <Button type="text" icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  };
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            ></Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{getelem()}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`);
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
