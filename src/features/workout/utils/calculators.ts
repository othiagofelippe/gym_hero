import { AVERAGE_SET_TIME_SECONDS } from "../constants";
import type { ExerciseConfig } from "../types";

export const calculateEstimatedTime = (exercises: ExerciseConfig[]): number => {
  const totalSeconds = exercises.reduce((total, ex) => {
    const timePerSet = AVERAGE_SET_TIME_SECONDS + ex.rest;
    return total + ex.sets * timePerSet;
  }, 0);
  return Math.round(totalSeconds / 60);
};

export const calculateWorkoutProgress = (
  currentExerciseIndex: number,
  totalExercises: number
): number => {
  return Math.round(((currentExerciseIndex + 1) / totalExercises) * 100);
};
