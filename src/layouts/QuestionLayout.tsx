import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import style from './ManageLayout.module.scss';
import { Spin } from 'antd';
import useLoadUserDate from '../hooks/userLoadUserData';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  const { waiting } = useLoadUserDate();
  useNavPage(waiting);
  return (
    <>
      {/* <div>QuestionLayout</div> */}
      <div>
        {waiting ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
