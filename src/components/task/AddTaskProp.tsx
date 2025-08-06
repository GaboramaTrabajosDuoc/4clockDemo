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

//oculta las tareas completadas
export const completeTask = async (id: number) => {
  const {error} = await supabase 
    .from('task')
    .update({ completed: true, completed_at: new Date().toISOString()})
    .eq('id', id);

  if (error) {
    console.error('Error al completar tarea: ', error);
    throw error;
  }
}; 

//añade tareas
export const addTask = async (task: TaskData) => {
  try {
    const taskWithUser = {
      ...task,
      user_id: ANON_USER_ID,
    };

    console.log('Intentando guardar tarea...', taskWithUser);
    const { data, error } = await supabase
      .from('task')
      .insert([taskWithUser])
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

//obtiene todas las tareas en la base de datos
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

// Eliminar una tarea
export const deleteTask = async (id: number) => {
  try {
    const { error } = await supabase
      .from('task')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
};

// Editar una tarea
export const updateTask = async (id: number, updates: Partial<TaskData>) => {
  try {
    const { error } = await supabase
      .from('task')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
};