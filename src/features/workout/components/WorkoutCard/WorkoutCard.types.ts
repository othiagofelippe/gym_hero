import type { Workout } from "../types";

export interface WorkoutCardProps {
  workout: Workout;
  onStart: (workoutId: string) => void;
  onMenuPress: (workoutId: string) => void;
}
