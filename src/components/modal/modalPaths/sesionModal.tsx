import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TaskModal({ onClose }: { onClose: () => void }) {
  return (
    <View className="bg-white p-4 rounded-lg">
      <Text className="text-lg font-bold">Crear Sesion de trabajo</Text>
      <Button title="Cerrar" onPress={onClose} />
    </View>
  );
}
