/**
 * 判断当前是否是登录状态 登录则不允许跳转到注册登录页 否则不允许进入到问卷等业务页面
 */
import useGetUserInfo from './useGetUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME, MANGE_LIST_PATHNAME, isLoginOrRefister, noLoginShowPage } from '../router';
import { useEffect } from 'react';

// watingUserData 调用时传的参数，表示是否在请求接口中
function useNavPage(watingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  console.log(username, 'lll');
  // hook不能放在if和for循环中
  useEffect(() => {
    if (watingUserData) return;
    if (username) {
      if (isLoginOrRefister(pathname)) {
        nav(MANGE_LIST_PATHNAME);
      }
      return;
    }

    //   未登录
    if (noLoginShowPage(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [watingUserData, username, pathname]);
  // 已经登录，不能再跳转到登录 注册页面
}
export default useNavPage;
