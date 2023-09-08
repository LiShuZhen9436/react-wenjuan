/**
 * 从redux中获取 page配置信息
 */

import { useSelector } from 'react-redux';

import { stateType } from '../store';
import { pageInfoType } from '../store/pageInfoReducer';

const getPageInfo = () => {
  const pageInfo = useSelector<stateType>((state) => state.pageInfo) as pageInfoType;
  return pageInfo;
};

export default getPageInfo;
