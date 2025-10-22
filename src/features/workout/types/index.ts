export interface ExerciseConfig {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
}

export interface Workout {
  id: string;
  name: string;
  muscleGroup: string;
  muscleGroupName: string;
  exercises: ExerciseConfig[];
  createdAt: string;
  lastPerformed?: string;
  timesCompleted: number;
}

// Re-export MuscleGroup from service
export type { MuscleGroup } from '../services/muscleGroupService';
