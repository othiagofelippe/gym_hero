import type { ExerciseConfig } from "@/features/workout/types";

export interface ExerciseConfigCardProps {
  exercise: ExerciseConfig;
  onEdit: (exerciseId: string) => void;
  disabled?: boolean;
}
