/*
  功能redux中获取用户信息
*/

import { useSelector } from 'react-redux';
import { stateType } from '../store';
import { userType } from '../store/userReducer';

function useGetUserInfo() {
  const { username, nickname } = useSelector<stateType>((state) => {
    console.log('stateUser:', state);
    return state.user;
  }) as userType;
  return { username, nickname };
}

export default useGetUserInfo;
