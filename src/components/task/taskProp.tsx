//src/components/task/taskProp.tsx

import {Task} from '../../types/task';

export interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onLongPress?: () => void;
}
