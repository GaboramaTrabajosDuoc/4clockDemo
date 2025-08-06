import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskItemProps } from './taskProp';
import TaskItem from './taskItem';

type Props = Omit<TaskItemProps, 'onLongPress'>;

function DragTask(props: Props) {
  const { task, onComplete, onDelete, onEdit } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  // Si no es web, devolvemos un componente simple sin dnd-kit.
  if (Platform.OS !== 'web') {
    return (
      <View>
        <TaskItem task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit} />
      </View>
    );
  }

  // --- El código de aquí en adelante SÓLO se ejecuta en la web ---
  const excludedProps = useMemo(() => [
    'role',
    'tabIndex',
    'aria-disabled',
    'aria-pressed',
    'aria-roledescription',
    'aria-describedby',
  ], []);

  const filteredAttributes = useMemo(() => Object.fromEntries(
    Object.entries(attributes).filter(([key]) => !excludedProps.includes(key))
  ), [attributes, excludedProps]);

  const style = useMemo(() => ({
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    touchAction: 'none',
  }), [transform, transition]);

  // Para la versión web, devolvemos el componente con todas las props y refs de dnd-kit.
  // Como estamos en un contexto web, TypeScript no se quejará del ref.
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...filteredAttributes}
      {...listeners}
    >
      <TaskItem task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default React.memo(DragTask);