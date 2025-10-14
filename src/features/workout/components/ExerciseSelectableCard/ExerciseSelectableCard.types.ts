export interface ExerciseSelectableCardProps {
  id: string;
  name: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}
