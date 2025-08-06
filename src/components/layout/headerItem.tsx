import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProgressBar from '../task/progresBarItem';
import useTask from '../hooks/useTasks';
import { Priority, Task } from '../../types/task';

type SortType = 'date' | 'priority' | 'none';

interface HeaderProps {
  onSort: (sorted: Task[]) => void;
  tasks: Task[];
}

function Header({ onSort, tasks }: HeaderProps) {
  const router = useRouter();
  const { activeTasks, completedTasks } = useTask();
  const [sortType, setSortType] = React.useState<SortType>('none');

  // Cálculo del progreso
  const progress = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return { total, completed };
  }, [tasks]);

  // Navegación al home
  const handleLogoPress = useCallback(() => {
    router.push('/');
  }, [router]);

  // Ordenamiento por fecha (usando list_pos)
  const handleSortByDate = useCallback(() => {
    if (sortType === 'date') {
      // Si ya está ordenado por fecha, revertir el orden
      onSort([...tasks].reverse());
    } else {
      const sorted = [...tasks].sort((a, b) => {
        // Ordenar por list_pos que representa el orden cronológico
        return a.list_pos - b.list_pos;
      });
      onSort(sorted);
    }
    setSortType(current => current === 'date' ? 'none' : 'date');
  }, [tasks, onSort, sortType]);

  // Ordenamiento por prioridad
  const handleSortByPriority = useCallback(() => {
    if (sortType === 'priority') {
      // Si ya está ordenado por prioridad, revertir el orden
      onSort([...tasks].reverse());
    } else {
      const priorityOrder: Record<Priority, number> = {
        'Must': 1,
        'Should': 2,
        'Could': 3,
        'Would': 4,
        'None': 5
      };

      const sorted = [...tasks].sort((a, b) => {
        // Manejar casos donde priority es null
        const priorityA = a.priority || 'None';
        const priorityB = b.priority || 'None';
        return priorityOrder[priorityA as Priority] - priorityOrder[priorityB as Priority];
      });
      onSort(sorted);
    }
    setSortType(current => current === 'priority' ? 'none' : 'priority');
  }, [tasks, onSort, sortType]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth:2, borderColor: 'red', padding: 10, backgroundColor: '#f8f9fa' }}>
      {/* Logo con acción */}
      <View className="flex-row items-center justify-between" style={{ width: '10%', marginRight: 20 }}>
        <TouchableOpacity 
          onPress={handleLogoPress} 
          className="py-1" 
          style={{ padding: 10, width: '100%', height: '100%', alignItems: 'center', borderRadius: 5 }}
        >
          <Text className="text-xl font-bold">4'🕓</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de progreso con datos reales */}
      <View className="my-2" style={{ width: '55%', marginRight: 20 }}>
        <ProgressBar total={progress.total} completed={progress.completed} />
      </View>

      {/* Botones de ordenamiento */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '31%', marginLeft:-8, padding: 10 }}  className="flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={handleSortByDate}
          style={{ 
            borderWidth: 2, 
            borderColor: sortType === 'date' ? 'darkblue' : 'blue',
            backgroundColor: sortType === 'date' ? '#e3f2fd' : 'transparent',
            padding: 10, 
            borderRadius: 5 
          }}
        >
          <Text className="text-l text-gray-700">Por Fecha</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleSortByPriority}
          style={{ 
            borderWidth: 2, 
            borderColor: sortType === 'priority' ? 'darkred' : 'red',
            backgroundColor: sortType === 'priority' ? '#ffebee' : 'transparent',
            padding: 8, 
            borderRadius: 5, 
            marginLeft: 10 
          }}
        >
          <Text className="text-l text-gray-700">Por Enfoque</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default Header;