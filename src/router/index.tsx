import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';
import Start from '../pages/manage/Start';
import Trash from '../pages/manage/Trash';
// import Edit from '../pages/question/Edit';
// import Stat from '../pages/question/Stat';

// 路由懒加载，减小打包体积
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'));
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'start',
            element: <Start />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 匹配不到的路由跳转到当前 都写在最后
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id', // id 代表参数
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]);
export default router;

export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANGE_LIST_PATHNAME = '/manage/list';
export const HOME_PATHNAME = '/';

// 当前路由是登录或注册页
export function isLoginOrRefister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
// 没有登录也可以跳转的页面
export function noLoginShowPage(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
