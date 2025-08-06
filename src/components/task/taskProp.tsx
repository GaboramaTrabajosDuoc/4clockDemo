//src/components/task/taskProp.tsx
//rename as taskProp.tsx in types folder
//This file defines the properties for a task item component

import {Task} from '../../types/task';

export interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onLongPress?: () => void;
}
