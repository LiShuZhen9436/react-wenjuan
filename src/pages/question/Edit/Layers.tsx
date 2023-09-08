/**
 * 拖拽移动组件
 */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import styles from './Layers.module.scss';
import useGetComponentsInfo from '../../../hooks/useGetComponentInfo';
import {
  setSelected,
  updateComponentTitle,
  lockComponent,
  hiddenComponent,
} from '../../../store/componentsReducer';
import { Button, Input, Space } from 'antd';
import { LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import SortableContainer from '../../../commponents/DragSortable/SortableContainer';
import SortableItem from '../../../commponents/DragSortable/SortableItem';
import { moveComponent } from '../../../store/componentsReducer';

const Layers: FC = () => {
  const dispatch = useDispatch();
  //   从redux中获取当前组件列表
  const { componentList, selected } = useGetComponentsInfo();
  const [changestate, setChangestate] = useState('');
  //   点击选中
  function handleClick(fe_id: string) {
    if (fe_id !== selected) {
      dispatch(setSelected(fe_id));
      setChangestate('');
      return;
    }
    setChangestate(fe_id);
  }
  //   input内容发生变化
  function inputChange(e: any) {
    const newVal = e.target.value.trim();
    if (!newVal) return;
    if (!selected) return;
    dispatch(updateComponentTitle({ fe_id: selected, title: newVal }));
  }
  function visibleClick(fe_id: string, isHidden: boolean) {
    if (!selected) return;
    dispatch(hiddenComponent({ selectId: fe_id, isVisible: isHidden }));
  }
  function lockClick(fe_id: string) {
    if (!selected) return;
    dispatch(lockComponent({ fe_id: fe_id }));
  }
  // SortableContainer 组件需要id属性
  const newComponentList = componentList.map((i) => {
    return { ...i, id: i.fe_id };
  });
  function onDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={newComponentList} onDragEnd={onDragEnd}>
      {componentList.map((item, index) => {
        const { fe_id, title, isLocked, isHidden } = item;
        // 拼接 titleclass
        const titleDefaultName = styles.title;
        const selectedClassName = styles.selected; // 当前选中项添加颜色
        const titleClassName = classnames({
          [titleDefaultName]: true,
          [selectedClassName]: fe_id == selected,
        });

        return (
          <SortableItem key={index} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => {
                  handleClick(fe_id);
                }}
              >
                {changestate == fe_id && (
                  <Input
                    value={title}
                    onPressEnter={() => setChangestate('')}
                    onBlur={() => setChangestate('')}
                    onChange={inputChange}
                  ></Input>
                )}
                {changestate !== fe_id && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'link' : 'text'}
                    onClick={() => {
                      visibleClick(fe_id, !isHidden);
                    }}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'link' : 'text'}
                    onClick={() => {
                      lockClick(fe_id);
                    }}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
