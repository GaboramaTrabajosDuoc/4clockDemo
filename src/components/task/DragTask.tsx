import React, { forwardRef } from 'react';
import { Platform, View, ViewProps } from 'react-native';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskItemProps } from './taskProp';
import TaskItem from './taskItem';

type Props = Omit<TaskItemProps, 'onLongPress'>;

function DragTask(props: Props) {
  const { task, onComplete, onDelete, onEdit } = props;

  // only to call useSortable once and avoid unnecessary re-renders
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Component to filter props if web
  const DraggableView = forwardRef<any, ViewProps>((viewProps, ref) => {
    return <View ref={ref} {...viewProps} />;
  });

  //in case of native platforms, we can directly use View
  if (Platform.OS !== 'web') {
    return (
      <View>
        <TaskItem task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit} />
      </View>
    );
  }

  // props to filter out if web
  const excludedProps = [
    'role',
    'tabIndex',
    'aria-disabled',
    'aria-pressed',
    'aria-roledescription',
    'aria-describedby',
  ];

  // Create new object without trublesome props
  const filteredAttributes = Object.fromEntries(
    Object.entries(attributes).filter(([key]) => !excludedProps.includes(key))
  );

  return (
    <DraggableView
      ref={setNodeRef}
      style={style}
      {...filteredAttributes} 
      {...listeners}
    >
      <TaskItem task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit} />
    </DraggableView>
  );
}

//react.memo to prevent unnecessary re-renders
export default React.memo(DragTask);