import type { Workout } from "../../types";

export interface WorkoutCardProps {
  workout: Workout;
  onPress: (workoutId: string) => void;
}
