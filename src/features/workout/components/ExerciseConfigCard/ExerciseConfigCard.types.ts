import type { ExerciseConfig } from "../types";

export interface ExerciseConfigCardProps {
  exercise: ExerciseConfig;
  onEdit: (exerciseId: string) => void;
  disabled?: boolean;
}
