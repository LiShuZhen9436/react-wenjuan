import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import QuestionCard from '../../commponents/QuestionCard';
import styles from './Common.module.scss';
import { Empty, Typography } from 'antd';
import ListSearch from '../../commponents/ListSearch';
// import { useRequest } from 'ahooks';
import { getQuestionList } from '../../axios/question';
import { Spin } from 'antd';
import { useRequest, useDebounceFn } from 'ahooks';
import KET_WORD, { PAGE_SIZE } from '../../constan';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;
const List: FC = () => {
  const [stated, setStated] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const isLoad = total > list.length; // 有没有更多数据
  // const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get(KET_WORD); // 搜索内容

  const srollRef = useRef<HTMLDivElement>(null);

  // 搜索时清空
  useEffect(() => {
    setStated(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyWord]);
  // 获取列表
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionList({
        search: keyWord || '',
        page,
        pageSize: PAGE_SIZE,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: questionList = [], total = 0 } = result || {};
        setList(list.concat(questionList));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  // 页面加载或搜索内容发生变化
  useEffect(() => {
    loadMore();
  }, [searchParams]);

  // useDebounceFn ahook的防抖hook
  const { run: loadMore } = useDebounceFn(scrollFn, {
    wait: 1000,
  });
  function scrollFn() {
    const elem = srollRef.current; // 获取加载更多div
    if (elem == null) return;
    const rect = elem.getBoundingClientRect();
    if (rect == null) return;
    const { bottom } = rect;
    const windowHeight = document.body.clientHeight;
    if (bottom <= windowHeight) {
      setStated(true);
      // 加载更多的div全不显示出来 执行加载
      load();
    }
  }
  // 页面滚动
  useEffect(() => {
    if (isLoad) {
      window.addEventListener('scroll', loadMore);
    }
    return () => {
      // 组件销毁时执行
      window.removeEventListener('scroll', loadMore);
    };
  }, [searchParams, isLoad]);

  // useMemo页面组件缓存
  const loadMoreElem = useMemo(() => {
    if (!stated || loading) return <Spin />;
    if (total == 0) return <Empty description="暂无数据！"></Empty>;
    if (!isLoad) return <span>没有更多了！</span>;
    return <div>加载下一页...</div>;
  }, [stated, loading, total, isLoad]);

  return (
    <div>
      <div className={styles.title}>
        <Title level={3}>我的问卷</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div>
        {/* 没获取到数据时显示加载中组件 */}
        {/* <div style={{ textAlign: 'center' }}>{loading && <Spin />}</div> */}
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
        <div className={styles.footer}>
          <div ref={srollRef}>{loadMoreElem}</div>
        </div>
      </div>
    </div>
  );
};
export default List;
