/**
 * 首页 右上角昵称退出/登录
 */
import React, { FC, useState } from 'react';
import styles from './UseInfo.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
// import { getUserInfo } from '../axios/user';
import { removeToken } from '../untils/user_token';
// import { useRequest } from 'ahooks';
import { UserOutlined } from '@ant-design/icons';
import { Space, message } from 'antd';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { loginOutReducer } from '../store/userReducer';

const UseInfo: FC = () => {
  // const [nickname, setnickname] = useState('');
  const nav = useNavigate();

  // 1、调用接口获取用户信息
  // const { data } = useRequest(
  //   async () => {
  //     const data = await getUserInfo();
  //     return data;
  //   },
  //   {
  //     onSuccess(res) {
  //       setnickname(res.nickname);
  //     },
  //   }
  // );

  // 2、改为从redux中获取用户信息
  const { username, nickname } = useGetUserInfo();
  const dispatch = useDispatch();

  function exit() {
    dispatch(loginOutReducer()); // 退出清空redux 的user数据
    removeToken();
    message.success('退出成功！');
    nav(LOGIN_PATHNAME);
  }
  const userInfo = (
    <div className={styles.userinfo}>
      <Space>
        <UserOutlined />
        <span>{nickname}</span>
        <span style={{ cursor: 'pointer' }} onClick={exit}>
          退出
        </span>
      </Space>
    </div>
  );
  const login = (
    <Link to={LOGIN_PATHNAME}>
      <div className={styles.userinfo}>登录</div>
    </Link>
  );
  return <div>{nickname ? userInfo : login}</div>;
};
export default UseInfo;
