import { useState, useCallback, useEffect } from 'react';
import{ Task } from '../../types/task'
import { getTasks, addTask as addTaskToSupa, completeTask as CompleteTaskInSupa } from '../../components/task/AddTaskProp';
import { defaultTasks, makeDefTask } from '../../config/taskSeed';

export function useTask(){
    const [tasks, setTasks] = useState<Task[]>(defaultTasks.map(makeDefTask));
    const [loading, setLoading] = useState(false);

    const loadTasks = useCallback(async () => {
        setLoading(true);
        try {
            let taskFromSupa = await getTasks();

            if (!taskFromSupa || taskFromSupa.length === 0) {
                for (const task of defaultTasks) {
                    await addTaskToSupa(task);
                }
                taskFromSupa = await getTasks();
            }

            setTasks(taskFromSupa);
        }catch (error){
            console.error('Error al cargar tareas: ', error);
        }finally{
            setLoading(false);
        }
    }, []);

     const completeTask = useCallback(async (id: number) => {
    try {
      await CompleteTaskInSupa(id);
      setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, completed: true } : task)
      );
    } catch (error) {
      console.error('Error al completar tarea:', error);
    }
  }, []);

  const reorderTasks = useCallback((newList: Task[]) => {
    setTasks(newList);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    setTasks: reorderTasks,
    completeTask,
    reload: loadTasks, loading,
  };
}

export default useTask;