import {NewTask, Task} from '../types/task';
import { ANON_USER_ID } from './anonUser';

export const defaultTasks:NewTask[] = [
  {
    title: 'Comprar pan',
    description: 'Ir a la panaderia antes de las 10am',
    priority: 'Must',
    list_pos: 1 
  },
  {
    title: 'Leer 10 páginas',
    description: '',
    priority: 'Should',
    list_pos: 2
  }
];

export const makeDefTask = (task: NewTask, index:number): Task => ({
  id: index,
  list_pos: index + 1,
  title: task.title,
  description: task.description,
  priority: task.priority,
  habit_category_id: null,
  completed: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user_id: ANON_USER_ID,
});