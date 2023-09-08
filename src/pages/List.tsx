import React, { FC, useState, useEffect } from 'react';
import QuestionCard from '../commponents/QuestionCard';
import styles from './List.module.scss';
import ListSearch from '../commponents/ListSearch';

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 0,
    createdAt: '3月12日 11:00',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: '3月14日 17:00',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 2,
    createdAt: '3月11日 11:00',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: false,
    answerCount: 1,
    createdAt: '3月19日 13:00',
  },
];
const List: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <div>
      <div className={styles.title}>
        <h1 className={styles.left}>我的问卷</h1>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {questionList.map((item) => {
        const { _id } = item;
        return <QuestionCard key={_id} {...item}></QuestionCard>;
      })}
      <div>footer</div>
    </div>
  );
};
export default List;
