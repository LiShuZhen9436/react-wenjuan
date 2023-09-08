/**
 * 调用接口查询问卷组件列表，并存储到redux中
 */
import { questionList } from '../axios/question';
import { useParams } from 'react-router-dom';

// 使用第三方hooks
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCompentents } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

function useLocalQuestion() {
  // 获取路由地址中的参数
  const { id } = useParams();
  const dispach = useDispatch();
  const { run, loading, error } = useRequest(
    async (id: string) => {
      const data = await questionList(id);
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        const { title, desc, js, css, componentList, isPublished } = res;
        // componentList的长度大于0 设置组件的列表的选中项为第一项
        let selected = '';
        if (componentList.length > 0) {
          selected = componentList[0].fe_id;
        }
        // 将数据存储到redux中
        dispach(resetCompentents({ componentList, selected, copiedComponent: null }));
        dispach(resetPageInfo({ title, desc, js, css, isPublished }));
      },
    }
  );

  // id参数发生变化时再次调用 函数
  useEffect(() => {
    run(id || '');
  }, [id]);
  return { loading, error };
}
export default useLocalQuestion;
