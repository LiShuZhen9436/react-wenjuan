/**
 * 自定义hook 或使用第三方ahook 实现查询单个问卷的接口调用
 *
 */

// 自定义hook
// import { useEffect, useState } from 'react';
import { questionList } from '../axios/question';
import { useParams } from 'react-router-dom';

// 使用第三方hooks
import { useRequest } from 'ahooks';

function useLocalQuestion() {
  // 获取路由地址中的参数
  const { id } = useParams(); // 在哪引入 就获取那个页面的参数
  //   数据是否加载完
  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});
  //   console.log('id:', id);
  //   useEffect(() => {
  //     async function getAuestion() {
  //       const data = await questionList(id || '');
  //       setLoading(false);
  //       setQuestionData(data);
  //     }
  //     getAuestion();
  //   }, []);

  // useRequest 的第一参数 调用接口的方法
  async function qlist() {
    const data = await questionList(id || '');
    return data;
  }
  //  使用第三方ahooks useRequest在组件初次加载时，会自动触发该函数执行
  const { data, error, loading } = useRequest(qlist);
  return { data, error, loading };
}
export default useLocalQuestion;
