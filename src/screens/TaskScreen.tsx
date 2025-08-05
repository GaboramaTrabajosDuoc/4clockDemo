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

  const {
    tasks: taskList,
    setTasks: setTaskList,
    completeTask: handleComplete, // corregido: era `completedTask`
    reload: loadTask,
  } = useTasks();

  const sensor = useSensors(useSensor(PointerSensor));

  const handleDelete = (id: number) => {
    console.log('Tarea eliminada: ', id);
  };

  const handleEdit = (id: number) => {
    console.log('Editar tarea:', id);
  };

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

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
          sensors={sensor}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={taskList.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {taskList.filter((t) => !t.completed).map((task) => (
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
        onClose={() => setShowTaskModal(false)}
        onSave={() => {
          setShowTaskModal(false);
          void loadTask();
        }}
        taskCount={taskList.length}
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
