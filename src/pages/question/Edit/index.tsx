import React, { FC } from 'react';
// import useLocalQuestion from '../../../hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { Spin } from 'antd';
import useLocalQuestion from '../../../hooks/useLoadQuestionData';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../../store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';

const Edit: FC = () => {
  const { loading } = useLocalQuestion();

  const dispatch = useDispatch();
  function handleClick() {
    dispatch(setSelected(''));
  }
  // return <div>Edit {loading ? 'loading....' : JSON.stringify(data)}</div>;
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={handleClick}>
            <div className={styles['canvas-warpper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
