/**
 * 拖拽排序组件
 */
import React, { FC, useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  //   arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void; // 拖拽结束后调用的方法
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 鼠标移动超过8px 判定为拖拽
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((c) => c.fe_id === active.id);
      const newIndex = items.findIndex((c) => c.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))} */}
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
