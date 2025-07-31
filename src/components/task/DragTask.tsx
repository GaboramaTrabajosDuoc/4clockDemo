import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskItemProps } from './taskProp';
import TaskItem from './taskItem';

type Props = Omit<TaskItemProps, 'onLongPress'>;

export default function SortableTaskItem(props: Props){
    const {task} = props;

    const {attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskItem {...props}/>
        </div>
    );
}