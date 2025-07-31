import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { addTask, TaskData } from '../task/AddTaskProp';
import { Button } from '~/components/Button'; // Usando tu componente Button existente

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor, introduce un título para la tarea.');
      return;
    }

    const newTaskData: TaskData = {
      title: title.trim(),
      description: description.trim() || null,
      priority: 'Should', // Prioridad por defecto, puedes cambiar esto por un Picker
    };

    try {
      await addTask(newTaskData);
      setTitle('');
      setDescription('');
      onTaskAdded(); // Esto dispara la actualización en TaskScreen
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
      Alert.alert('Error', `No se pudo añadir la tarea: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título de la nueva tarea" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descripción (opcional)" value={description} onChangeText={setDescription} />
      <Button title="Añadir Tarea" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AddTaskForm;