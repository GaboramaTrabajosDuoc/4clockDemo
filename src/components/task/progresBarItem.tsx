import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  total: number;
  completed: number;
}

function ProgressBar({ total, completed }: ProgressBarProps) {
  const percentage = (completed / total) * 100;

  return (
    <View style={{ flex: 1, width: '100%', marginTop: 8 }}>
      <View style={{ height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden' }}>
        <View style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#4caf50' }} />
      </View>
      <Text style={{ fontSize: 12, marginTop: 4 }}>
        {completed} de {total} tareas completadas
      </Text>
    </View>
  );
}

export default ProgressBar;
