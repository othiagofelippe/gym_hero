export interface MuscleGroupCardProps {
  id: string;
  name: string;
  imageUrl: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
