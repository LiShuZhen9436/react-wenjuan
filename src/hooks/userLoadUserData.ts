/**
 * 调用获取用户信息接口
 * 先判断当前有没有用户信息 没有则获取 有则return
 * 获取用户信息后dispach到redux中
 */
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../axios/user';
import { loginReducer } from '../store/userReducer';
import useGetUserInfo from '../hooks/useGetUserInfo';

function useLoadUserDate() {
  const dispach = useDispatch();

  const [waiting, setwaiting] = useState(true);

  const { run } = useRequest(getUserInfo, {
    manual: true, // 设置为true 则 useRequest 不会默认执行，需要通过 run 来触发执行
    onSuccess(res) {
      const { username, nickname } = res;
      console.log('ppp:', username, nickname);
      // 获取用户信息成功 用dispach的action设置用户信息
      dispach(loginReducer({ username, nickname }));
    },
    onFinally() {
      // 不管成功时报都会执行
      setwaiting(false);
    },
  });

  const { username } = useGetUserInfo(); // redux中获取用户信息
  useEffect(() => {
    if (username) {
      setwaiting(false);
      return;
    } else {
      run();
    }
  }, [username]);
  return { waiting };
}
export default useLoadUserDate;
