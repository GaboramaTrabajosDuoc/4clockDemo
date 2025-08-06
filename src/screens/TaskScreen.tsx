// src/screens/TaskScreen.tsx
// in this file, we will create a TaskScreen component that displays a list of tasks
// and allows adding new tasks, using the Task type defined in task.d.ts
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import { Task } from '../types/task';
import { ANON_USER_ID } from '../config/anonUser';
import { defaultTasks, makeDefTask } from '../config/taskSeed';

import AddTaskForm from '../components/modal/AddTaskForm';
import TaskModal from '../components/modal/modalPaths/taskModal';
import Header from '../components/layout/headerItem';
import Footer from '../components/layout/footerItem';
import DragTask from '../components/task/DragTask';
import { addTask, getTasks, completeTask } from '../components/task/AddTaskProp';
import useTasks from '../components/hooks/useTasks';

function TaskScreen() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    tasks: taskList,
    setTasks: setTaskList,
    completeTask: handleComplete,
    deleteTask,
    editTask,
    reload: loadTask,
  } = useTasks();

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      loadTask(); // Reload the task list
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleEdit = (id: number) => {
    const taskToEdit = taskList.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setShowTaskModal(true);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = taskList.findIndex((task) => task.id === active.id);
    const newIndex = taskList.findIndex((task) => task.id === over.id);

    const reordered = arrayMove(taskList, oldIndex, newIndex).map((task, idx) => ({
      ...task,
      list_pos: idx + 1,
    }));

    setTaskList(reordered);
    console.log('Nuevo orden:', reordered.map((t) => `${t.list_pos}) ${t.title}`));
  };

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  // Funciones de ordenamiento
  const handleSort = (sorted: Task[]) => {
    setTaskList(sorted.map((task, idx) => ({
      ...task,
      list_pos: idx + 1,
    })));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header onSort={handleSort} tasks={taskList} />

      <View style={styles.buttonContainer}>
        {renderButton('+ Nueva Tarea', () => setShowTaskModal(true))}
        {renderButton('+ Nueva Rutina', () => console.log('Nueva rutina'))}
        {renderButton('+ Nueva Sesión', () => console.log('Nueva sesión'))}
        {renderButton('+ Guardar Día', () => console.log('Guardar día'))}
        {renderButton('+ Nuevo Hábito', () => console.log('Nuevo hábito'))}
      </View>

      <View style={{ flex: 1 }}>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={taskList.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {taskList.filter((t) => !t.completed).map((task) => (
              //to show unfinished tasks
              <DragTask
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </SortableContext>
        </DndContext>
      </View>

      <TaskModal
        visible={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSave={() => {
          setShowTaskModal(false);
          setEditingTask(null);
          void loadTask();
        }}
        taskCount={taskList.length}
        taskState={editingTask}
      />

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskScreen;
