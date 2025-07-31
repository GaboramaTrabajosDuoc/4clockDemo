import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import type { Priority, NewTask } from '../../../types/task';
import { addTask } from '../../task/AddTaskProp'; // Asegúrate de que la ruta sea correcta
import type { TaskData } from '../../task/AddTaskProp';


type Props = {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
  taskCount: number;
};

const TaskModal: React.FC<Props> = ({ visible, onClose, onSave, taskCount }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Título Requerido', 'Por favor, introduce un título para la tarea.');
      return;
    }

    if (!priority) {
      Alert.alert('Prioridad Requerida', 'Por favor, selecciona una prioridad para la tarea.');
      return;
    }

    const taskData: NewTask = {
      title: title.trim(),
      description: description.trim() || null,
      priority,
      list_pos: taskCount + 1,
    };

    try {
      await addTask(taskData as TaskData);
      if (onSave) onSave(); // Notifica si se necesita recarga
      setTitle('');
      setDescription('');
      setPriority('');
      onClose();
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      Alert.alert('Error', 'No se pudo guardar la tarea. Intenta nuevamente.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>  
            <Text style={styles.title}>Nueva Tarea</Text>
          </View>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, { height: 60 }]}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>  
            <Text style={{fontSize: 25}}>Priority</Text>
          </View>
          <View style={styles.priorityRow}>
            {(['Must', 'Should', 'Could', 'Would'] as Priority[]).map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                style={[
                  styles.priorityButton,
                  priority === p && styles.prioritySelected,
                ]}
              >
                <Text>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={{borderWidth: 2, borderColor:'red', borderRadius: 5, padding: 4, margin: 5 }}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={{borderWidth: 2, borderColor:'darkblue', borderRadius: 5, padding: 4, margin: 5 }}>
              <Text>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    width: '85%', backgroundColor: '#fff',
    borderRadius: 10, padding: 20, borderWidth: 3, 
  },
  title: { fontSize: 25, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 10
  },
  priorityRow: {
    flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10, paddingTop: 20, paddingBottom: 20
  },
  priorityButton: {
    borderWidth: 1, borderColor: '#ccc',
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5
  },
  prioritySelected: {
    backgroundColor: '#cdeffd'
  },
  buttons: {
    flexDirection: 'row', justifyContent: 'space-between'
  }
});
