import { useState, useEffect } from "react";
import { muscleGroupService, type MuscleGroup } from "../services";

export function useMuscleGroups() {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMuscleGroups = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const groups = await muscleGroupService.getMuscleGroups();

        if (isMounted) {
          setMuscleGroups(groups);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar grupos musculares:", err);
        if (isMounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    };

    loadMuscleGroups();

    // Subscribe to real-time updates
    const unsubscribe = muscleGroupService.subscribeToMuscleGroups(
      (updatedGroups) => {
        if (isMounted) {
          setMuscleGroups(updatedGroups);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const getMuscleGroupById = (id: string): MuscleGroup | undefined => {
    return muscleGroups.find((group) => group.id === id);
  };

  const getMuscleGroupName = (id: string): string => {
    return getMuscleGroupById(id)?.name || id;
  };

  return {
    muscleGroups,
    isLoading,
    error,
    getMuscleGroupById,
    getMuscleGroupName,
  };
}
