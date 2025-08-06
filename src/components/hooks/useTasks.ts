import { useState, useCallback, useEffect, useMemo } from 'react';
import { Task } from '../../types/task';
import { 
  getTasks, 
  addTask as addTaskToSupa, 
  completeTask as CompleteTaskInSupa,
  deleteTask as deleteTaskFromSupa,
  updateTask as updateTaskInSupa
} from '../../components/task/AddTaskProp';
import { defaultTasks, makeDefTask } from '../../config/taskSeed';

// Tipos de estado para mejor manejo de carga y errores
type TasksState = {
  data: Task[];
  loading: boolean;
  error: Error | null;
};

export function useTask() {
  // Estado unificado para mejor manejo de actualizaciones
  const [state, setState] = useState<TasksState>({
    data: defaultTasks.map(makeDefTask),
    loading: false,
    error: null
  });

  // Actualizador de estado optimizado
  const updateState = useCallback((updates: Partial<TasksState>) => {
    setState(current => ({ ...current, ...updates }));
  }, []);

  // Gestor de errores centralizado
  const handleError = useCallback((error: Error, context: string) => {
    console.error(`Error en ${context}:`, error);
    updateState({ error, loading: false });
  }, [updateState]);

  // Carga inicial optimizada
  const loadTasks = useCallback(async () => {
    updateState({ loading: true, error: null });
    try {
      let taskFromSupa = await getTasks();

      if (!taskFromSupa?.length) {
        await Promise.all(defaultTasks.map(task => addTaskToSupa(task)));
        taskFromSupa = await getTasks();
      }

      updateState({ data: taskFromSupa, loading: false });
    } catch (error) {
      handleError(error as Error, 'loadTasks');
    }
  }, [updateState, handleError]);

  // Estados derivados memoizados
  const activeTasks = useMemo(() => 
    state.data.filter(task => !task.completed),
    [state.data]
  );

  const completedTasks = useMemo(() => 
    state.data.filter(task => task.completed),
    [state.data]
  );

  // Operaciones de tareas optimizadas
  const completeTask = useCallback(async (id: number) => {
    try {
      await CompleteTaskInSupa(id);
      setState(current => ({
        ...current,
        data: current.data.map(task => 
          task.id === id ? { ...task, completed: true } : task
        )
      }));
    } catch (error) {
      handleError(error as Error, 'completeTask');
    }
  }, [handleError]);

  const deleteTask = useCallback(async (id: number) => {
    try {
      await deleteTaskFromSupa(id);
      setState(current => ({
        ...current,
        data: current.data.filter(task => task.id !== id)
      }));
    } catch (error) {
      handleError(error as Error, 'deleteTask');
    }
  }, [handleError]);

  const editTask = useCallback(async (id: number, updates: Partial<Task>) => {
    try {
      await updateTaskInSupa(id, updates);
      setState(current => ({
        ...current,
        data: current.data.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      }));
    } catch (error) {
      handleError(error as Error, 'editTask');
    }
  }, [handleError]);

  const reorderTasks = useCallback((newList: Task[]) => {
    setState(current => ({
      ...current,
      data: newList
    }));
  }, []);

  // Efecto inicial
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks: state.data,
    activeTasks,
    completedTasks,
    loading: state.loading,
    error: state.error,
    setTasks: reorderTasks,
    completeTask,
    deleteTask,
    editTask,
    reload: loadTasks,
  };
}

export default useTask;