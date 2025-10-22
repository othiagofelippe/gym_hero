import { useState } from "react";
import { router } from "expo-router";
import { useExercises } from "./useExercises";
import { useMuscleGroups } from "./useMuscleGroups";

export function useExerciseSelection(muscleGroup: string) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const { exercises, isLoading: isLoadingExercises } = useExercises({ muscleGroupId: muscleGroup });
  const { getMuscleGroupName, isLoading: isLoadingGroups } = useMuscleGroups();

  const groupName = getMuscleGroupName(muscleGroup);
  const isLoading = isLoadingExercises || isLoadingGroups;

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
    isLoading,
    toggleExercise,
    handleNext,
  };
}
