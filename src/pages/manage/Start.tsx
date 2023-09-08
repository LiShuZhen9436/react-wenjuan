import React, { FC, useState } from 'react';
import QuestionCard from '../../commponents/QuestionCard';
import styles from './Common.module.scss';
import { Typography, Empty } from 'antd';
import ListSearch from '../../commponents/ListSearch';
import searchQuestionList from '../../hooks/useLoadSearchQuestionData';
import { Spin } from 'antd';
import PaginationCom from '../../commponents/PaginationCom';

const { Title } = Typography;
const Start: FC = () => {
  // const [questionList] = useState(rawQuestionList);
  const { data = {}, loading, error } = searchQuestionList({ isStar: true });
  const { list: questionList = [], total = 0 } = data || {};
  return (
    <div>
      <div className={styles.title}>
        <Title level={3}>标星问卷</Title>
        <div className={styles.right}>
          {' '}
          <ListSearch />
        </div>
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div>
        {!loading && questionList.length == 0 ? <Empty description="暂无数据！" /> : ''}
        {questionList.length > 0 &&
          questionList.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
        <div className={styles.footer}>
          <PaginationCom total={total}></PaginationCom>
        </div>
      </div>
    </div>
  );
};

export default Start;
