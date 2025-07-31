import React from 'react';
import { Modal, View } from 'react-native';
import { ModalType, IndexModalProps,} from './modalProp'; 

// creation modals
import TaskModal from './modalPaths/taskModal';
import HabitModal from './modalPaths/habitModal';
import RoutineModal from './modalPaths/rutineModal';
import SesionModal from './modalPaths/sesionModal';
import DayModal from './modalPaths/dayModal';

// edit modals
import EditTaskModal from './modalPaths/editTaskModal';
import EditHabitModal from './modalPaths/editHabitModal';
import EditRoutineModal from './modalPaths/editRoutineTask';
import EditSesionModal from './modalPaths/editSesionModal';
import EditDayModal from './modalPaths/editDayModal';

export default function IndexModal({ type, visible, onClose, data }: IndexModalProps) {
  const renderContent = () => {
    switch (type) {
      case 'task':
        return <TaskModal onClose={onClose} />;
      case 'editTask':
        return <EditTaskModal onClose={onClose} data={data} />;
      case 'habit':
        return <HabitModal onClose={onClose} />;
      case 'editHabit':
        return <EditHabitModal onClose={onClose} data={data} />;
      case 'routine':
        return <RoutineModal onClose={onClose} />;
      case 'editRoutine':
        return <EditRoutineModal onClose={onClose} data={data} />;
      case 'sesion':
        return <SesionModal onClose={onClose} />;
      case 'editSesion':
        return <EditSesionModal onClose={onClose} data={data} />;
      case 'day':
        return <DayModal onClose={onClose} />;
      case 'editDay':
        return <EditDayModal onClose={onClose} data={data} />;
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-center items-center">
        {renderContent()}
      </View>
    </Modal>
  );
}
