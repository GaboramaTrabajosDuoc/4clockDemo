import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

interface ProgressBarProps {
  total: number;
  completed: number;
}

function ProgressBar({ total, completed }: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: percentage,
      useNativeDriver: false,
      tension: 10,
      friction: 8
    }).start();
  }, [percentage]);

  // Color basado en el progreso
  const getColor = () => {
    if (percentage < 30) return '#ff5252'; // Rojo para bajo progreso
    if (percentage < 70) return '#ffd740'; // Amarillo para progreso medio
    return '#4caf50'; // Verde para buen progreso
  };

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            { 
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: getColor()
            }
          ]} 
        />
      </View>
      <Text style={styles.text}>
        {completed} de {total} tareas completadas ({percentage.toFixed(0)}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 8,
  },
  barContainer: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333'
  }
});

export default ProgressBar;
