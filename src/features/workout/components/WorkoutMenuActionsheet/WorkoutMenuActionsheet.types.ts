export interface WorkoutMenuActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}
