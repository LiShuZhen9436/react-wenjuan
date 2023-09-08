import React, { FC } from 'react';
import { Button, Tooltip, Space } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import {
  deleteComponent,
  hiddenComponent,
  lockComponent,
  copyComponent,
  pastComponent,
} from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import { moveComponent } from '../../../store/componentsReducer';
import { ActionCreators as undoActionCreators } from 'redux-undo';

const EditToolbar: FC = () => {
  const diapath = useDispatch();
  const { selected, selectedComponent, componentList, copiedComponent } = useGetComponentsInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const nowSelIndex = componentList.findIndex((c) => c.fe_id == selected); // 当前选中组件的索引
  // 删除
  const hanleClick = () => {
    diapath(deleteComponent());
  };
  // 隐藏
  const visibleClick = () => {
    diapath(hiddenComponent({ selectId: selected, isVisible: true }));
  };
  // 锁定
  const lockClick = () => {
    // isLocked = !isLocked;
    diapath(lockComponent({ fe_id: selected }));
  };
  // 复制
  const copiedClick = () => {
    diapath(copyComponent());
  };
  // 粘贴
  const pastClick = () => {
    diapath(pastComponent());
  };
  const moveComponentClick = (type: number) => {
    // 上移
    if (type == 0) {
      diapath(moveComponent({ oldIndex: nowSelIndex, newIndex: nowSelIndex - 1 }));
      return;
    }
    // 下移
    if (type == 1) {
      diapath(moveComponent({ oldIndex: nowSelIndex, newIndex: nowSelIndex + 1 }));
      return;
    }
  };
  function undo() {
    // 撤销
    diapath(undoActionCreators.undo());
  }
  function redo() {
    // 重做
    diapath(undoActionCreators.redo());
  }
  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={hanleClick}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={visibleClick}></Button>
        </Tooltip>
        <Tooltip title={!isLocked ? '锁定' : '解锁'}>
          <Button
            type={isLocked ? 'primary' : 'default'}
            shape="circle"
            icon={<LockOutlined />}
            onClick={lockClick}
          ></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copiedClick}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            disabled={copiedComponent == null}
            onClick={pastClick}
          ></Button>
        </Tooltip>
        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            disabled={nowSelIndex == 0}
            onClick={() => {
              moveComponentClick(0);
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            disabled={nowSelIndex == length - 1}
            onClick={() => {
              moveComponentClick(1);
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
        </Tooltip>
      </Space>
    </div>
  );
};
export default EditToolbar;
