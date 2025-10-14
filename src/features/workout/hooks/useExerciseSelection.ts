import { useState } from "react";
import { router } from "expo-router";
import { EXERCISES_BY_GROUP, MUSCLE_GROUP_NAMES } from "../constants";

export function useExerciseSelection(muscleGroup: string) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const exercises = EXERCISES_BY_GROUP[muscleGroup] || [];
  const groupName = MUSCLE_GROUP_NAMES[muscleGroup] || muscleGroup;

  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleNext = () => {
    const selectedExercisesData = exercises
      .filter((ex: { id: string }) => selectedExercises.includes(ex.id))
      .map((ex: { id: string; name: string }) => ({
        id: ex.id,
        name: ex.name,
      }));

    router.push({
      pathname: "/(tabs)/(workout)/configure",
      params: {
        muscleGroup,
        exercises: JSON.stringify(selectedExercisesData),
      },
    });
  };

  return {
    selectedExercises,
    exercises,
    groupName,
    toggleExercise,
    handleNext,
  };
}
