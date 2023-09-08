/**
 * 调用接口查询问卷列表
 */
import { useSearchParams } from 'react-router-dom';
import KET_WORD, { PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE } from '../constan/index';
import { useRequest } from 'ahooks';
import { getQuestionList } from '../axios/question';

type searchOpt = {
  isStar: boolean;
  isDelete: boolean;
};
function searchQuestionList(opt: Partial<searchOpt> = {}) {
  // 获取地址栏的搜索参数
  const { isStar, isDelete } = opt;
  const [searchParams] = useSearchParams();
  const { data, loading, error, refresh } = useRequest(
    async () => {
      // hook在组件中引入时 可自动获取到组件中的信息，
      const curVal = searchParams.get(KET_WORD) || '';
      const page = parseInt(searchParams.get(PAGE_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(PAGE_SIZE_KEY) || '') || PAGE_SIZE;
      const data = await getQuestionList({ search: curVal, isStar, isDelete, page, pageSize });
      return data;
    },
    {
      refreshDeps: [searchParams], // 依赖项 searchParams改变时重新执行当前函数
    }
  );
  // refresh 手动刷新 在页面中调用refresh 重新执行当前函数
  return { data, loading, error, refresh };
}
export default searchQuestionList;
