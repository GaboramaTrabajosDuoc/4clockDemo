//src\components\task\AddTaskProp.tsx

import { supabase } from '~/lib/supabase';
import { ANON_USER_ID } from '~/src/config/anonUser';
import { NewTask } from '../../types/task';
import { Task } from '../../types/task';

export interface TaskData {
  title: string;
  description?: string | null;
  priority: 'Should' | 'Must' | 'Could' | 'Would' | 'None' | null;
  list_pos: number;
}

export const addTask = async (task: TaskData) => {
  try {
    const taskWithUser = {
      ...task,
      user_id: ANON_USER_ID,
    };

    console.log('Intentando guardar tarea...', taskWithUser);
    const { data, error } = await supabase
      .from('task')
      .insert(taskWithUser)
      .select();

    if (error) {
      throw error;
    }

    console.log('Tarea guardada:', data);
    return data;
  } catch (error) {
    console.error('Error al insertar en Supabase:', error);
    throw error;
  }
};


export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('task')
      .select('*')
      .eq('user_id', ANON_USER_ID) //FILTRO DE USUARIO ANON
      .order('id', { ascending: false });

    if (error) {
      throw error;
    }
    return data as Task[];
  } catch (error) {
    console.error('Error al obtener las tareas desde Supabase:', error);
    throw error;
  }
};