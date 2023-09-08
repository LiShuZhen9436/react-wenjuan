/* 
   分页组件 多个页面使用所以抽离成公共组件(标星问卷和回收站都有使用分页组件)
*/
import React, { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE } from '../constan';

type propsType = {
  total: number;
};
const PaginationCom: FC<propsType> = (props: propsType) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const nav = useNavigate();
  const { pathname } = useLocation(); // 获取当前路由路径
  const [searchParams] = useSearchParams(); // 获取路由地址中的参数
  function pagChange(page: number, pageSize: number) {
    // setPage(page);
    // setPageSize(pageSize);
    // 向地址栏中添加参数
    searchParams.set(PAGE_KEY, page.toString() || '');
    searchParams.set(PAGE_SIZE_KEY, pageSize.toString() || '');
    nav({
      pathname,
      search: searchParams.toString() || '',
    });
  }
  // 监听路由中的地址参数发生变化时执行
  useEffect(() => {
    const page = parseInt(searchParams.get(PAGE_KEY) || '') || 1;
    setPage(page);
    const pageSize = parseInt(searchParams.get(PAGE_SIZE_KEY) || '') || PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);
  return (
    <>
      <Pagination current={page} pageSize={pageSize} total={props.total} onChange={pagChange} />
    </>
  );
};

export default PaginationCom;
