import React, { FC, useState } from 'react';
import useLocalQuestion from '../../../hooks/useLoadQuestionData';
import getPageInfo from '../../../hooks/useGetPageInfo';
import { Result, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import StatHeader from './StatHeader';
import CommitList from './CommitList';
import PageStat from './PageStat';
import StatChart from './StatChart';

const Stat: FC = () => {
  // 调用接口获取问卷信息(组件等)
  const { loading } = useLocalQuestion();
  const { isPublished } = getPageInfo();
  // console.log('isPublished:', isPublished);

  // 子组件状态提升，在中间和右侧 都用
  const [selectComponentId, setSelectComponentId] = useState('');
  const [selectComponentType, setSelectComponentType] = useState('');
  const nav = useNavigate();
  const loadingElem = (
    <div style={{ flex: 1, textAlign: 'center', marginTop: '20px' }}>
      <Spin />
    </div>
  );
  function getElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          style={{ flex: 1 }}
          status="warning"
          title="该页面未发布"
          extra={
            <Button
              type="primary"
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
          }
        />
      );
    } else {
      return (
        <>
          <div className={styles.left}>
            {/* 左侧 */}
            <CommitList
              selectComponentId={selectComponentId}
              setSelectComponentId={setSelectComponentId}
              setSelectComponentType={setSelectComponentType}
            />
          </div>
          <div className={styles.main}>
            <PageStat
              selectComponentId={selectComponentId}
              setSelectComponentId={setSelectComponentId}
              setSelectComponentType={setSelectComponentType}
            />
          </div>
          <div className={styles.right}>
            {/* 右侧图表 */}
            <StatChart
              selectComponentId={selectComponentId}
              setSelectComponentId={setSelectComponentId}
              setSelectComponentType={setSelectComponentType}
              selectComponentType={selectComponentType}
            />
          </div>
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {loading && loadingElem}
          {!loading && getElem()}
        </div>
      </div>
    </div>
  );
};

export default Stat;
