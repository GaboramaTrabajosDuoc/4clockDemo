import { supabase } from '~/lib/supabase';
import type { Task, NewTask } from '~/src/types/task.d';

export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('Task').select('*').order('id');
  if (error) throw error;
  return data || [];
};

export const addTask = async (task: NewTask): Promise<Task | null> => {
  const { data, error } = await supabase.from('Task').insert(task).select().single();
  if (error) throw error;
  return data;
};

// Aquí podrías añadir updateTask, deleteTask, etc.