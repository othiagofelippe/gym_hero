import { useState, useEffect } from "react";
import { exerciseService, type Exercise } from "../services";

interface UseExercisesOptions {
  muscleGroupId?: string;
}

export function useExercises(options?: UseExercisesOptions) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const muscleGroupId = options?.muscleGroupId;

  useEffect(() => {
    let isMounted = true;

    const loadExercises = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedExercises = muscleGroupId
          ? await exerciseService.getExercisesByMuscleGroup(muscleGroupId)
          : await exerciseService.getExercises();

        if (isMounted) {
          setExercises(loadedExercises);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar exercícios:", err);
        if (isMounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    };

    loadExercises();

    // Subscribe to real-time updates
    const unsubscribe = exerciseService.subscribeToExercises(
      muscleGroupId || null,
      (updatedExercises) => {
        if (isMounted) {
          setExercises(updatedExercises);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [muscleGroupId]);

  const getExerciseById = (id: string): Exercise | undefined => {
    return exercises.find((exercise) => exercise.id === id);
  };

  const getExerciseName = (id: string): string => {
    return getExerciseById(id)?.name || id;
  };

  return {
    exercises,
    isLoading,
    error,
    getExerciseById,
    getExerciseName,
  };
}
