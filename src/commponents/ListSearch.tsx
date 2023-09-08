/**
 * 搜索组件
 */
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import KET_WORD from '../constan/index';

const { Search } = Input;
const ListSearch: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const nav = useNavigate(); // 路由跳转
  const { pathname } = useLocation(); // 获取url地址
  // 获取url参数 并设置到input value
  const [searchParams] = useSearchParams();

  // 搜索地址发生变化和页面渲染时，获取地址栏路由的搜索关键字赋值给搜索框
  useEffect(() => {
    const curVal = searchParams.get(KET_WORD) || '';
    setSearchValue(curVal);
  }, [searchParams]);

  // 搜上索时在链接上拼接参数，防止刷新时参数丢失
  function onSearch(value: string) {
    nav({
      pathname,
      search: `${KET_WORD}=${searchValue}`,
    });
  }
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
  return (
    <div>
      <Search
        placeholder="请输入搜索内容"
        allowClear
        value={searchValue}
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default ListSearch;
