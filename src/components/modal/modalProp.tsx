// src/components/modals/modalProp.tsx

export type ModalType =
  | 'task'
  | 'editTask'
  | 'habit'
  | 'editHabit'
  | 'routine'
  | 'editRoutine'
  | 'sesion'
  | 'editSesion'
  | 'day'
  | 'editDay';

export interface IndexModalProps {
  type: ModalType;
  visible: boolean;
  onClose: () => void;
  data?: any;
}
