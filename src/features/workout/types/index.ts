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

export interface MuscleGroup {
  id: string;
  name: string;
  icon: string;
}
