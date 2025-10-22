import { useState, useEffect } from "react";
import { router } from "expo-router";
import type { ExerciseConfig } from "../types";

export function useWorkoutConfiguration(
  muscleGroup: string,
  exercises: Array<{ id: string; name: string }>
) {
  const [defaultSets, setDefaultSets] = useState(3);
  const [defaultReps, setDefaultReps] = useState(10);
  const [defaultRest, setDefaultRest] = useState(60);
  const [applyToAll, setApplyToAll] = useState(true);

  const [exerciseConfigs, setExerciseConfigs] = useState<ExerciseConfig[]>([]);

  const [showActionsheet, setShowActionsheet] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseConfig | null>(null);

  const [tempSets, setTempSets] = useState(3);
  const [tempReps, setTempReps] = useState(10);
  const [tempRest, setTempRest] = useState(60);

  useEffect(() => {
    setExerciseConfigs(
      exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: defaultSets,
        reps: defaultReps,
        rest: defaultRest,
      }))
    );
  }, [exercises]);

  useEffect(() => {
    if (applyToAll) {
      setExerciseConfigs((prev) =>
        prev.map((config) => ({
          ...config,
          sets: defaultSets,
          reps: defaultReps,
          rest: defaultRest,
        }))
      );
    }
  }, [defaultSets, defaultReps, defaultRest, applyToAll]);

  const handleEditExercise = (exerciseId: string) => {
    const exercise = exerciseConfigs.find((ex) => ex.id === exerciseId);
    if (exercise) {
      setEditingExercise(exercise);
      setTempSets(exercise.sets);
      setTempReps(exercise.reps);
      setTempRest(exercise.rest);
      setShowActionsheet(true);
    }
  };

  const handleSaveExercise = () => {
    if (editingExercise) {
      setExerciseConfigs((prev) =>
        prev.map((config) =>
          config.id === editingExercise.id
            ? { ...config, sets: tempSets, reps: tempReps, rest: tempRest }
            : config
        )
      );
      setShowActionsheet(false);
      setEditingExercise(null);
    }
  };

  const handleCloseActionsheet = () => {
    setShowActionsheet(false);
    setEditingExercise(null);
  };

  const handleNext = () => {
    router.push({
      pathname: "/(tabs)/(workout)/name",
      params: {
        muscleGroup,
        exercises: JSON.stringify(exerciseConfigs),
      },
    });
  };

  return {
    defaultSets,
    setDefaultSets,
    defaultReps,
    setDefaultReps,
    defaultRest,
    setDefaultRest,
    applyToAll,
    setApplyToAll,
    exerciseConfigs,
    showActionsheet,
    editingExercise,
    tempSets,
    setTempSets,
    tempReps,
    setTempReps,
    tempRest,
    setTempRest,
    handleEditExercise,
    handleSaveExercise,
    handleCloseActionsheet,
    handleNext,
  };
}
