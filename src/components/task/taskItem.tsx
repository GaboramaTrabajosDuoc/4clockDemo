import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TaskItemProps} from './taskProp';

export default function TaskItem({ task, onComplete, onDelete, onEdit, onLongPress }: TaskItemProps) {
    const [expanded, setExpanded] = useState(false);
    const lastTap = useRef<number>(0);

const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if(lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
        setExpanded(prev => !prev);
    }
    lastTap.current = now;
};

  return (
    <TouchableOpacity onPress={handlePress} onLongPress={onLongPress} activeOpacity={0.9}>
      <View style={styles.container}>
        {/* Número y título */}
        <View style={styles.headerRow}>
          <Text style={styles.index}>{task.list_pos})</Text>
          <Text style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </Text>
        </View>

        {/* Descripción expandida */}
        {expanded && task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}

        {/* Acciones */}
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => { console.log('onComplete llegó:', onComplete); onComplete(task.id);}}
            style={styles.button}
          >
            <Text>✅</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { console.log('onDelete llegó:', onDelete); onDelete(task.id);}} style={styles.button}>
            <Text>❌</Text>
          </TouchableOpacity>
          {expanded && (
            <TouchableOpacity onPress={() => { console.log('onEdit llegó:', onEdit); onEdit(task.id);}} style={styles.button}>
              <Text>✏️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  index: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  button: {
    marginHorizontal: 4,
  },
});