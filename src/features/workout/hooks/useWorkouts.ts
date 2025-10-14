import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { workoutStorage } from "../services";
import type { Workout } from "../types";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  const loadWorkouts = async () => {
    try {
      const data = await workoutStorage.getAll();
      setWorkouts(data);
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  const handleCreateWorkout = () => {
    router.push("/(tabs)/(workout)/create");
  };

  const handleStartWorkout = (workoutId: string) => {
    router.push({
      pathname: "/(tabs)/(workout)/execute",
      params: { workoutId },
    });
  };

  const handleWorkoutMenu = (workoutId: string) => {
    setSelectedWorkoutId(workoutId);
    setShowActionsheet(true);
  };

  const handleEditWorkout = () => {
    setShowActionsheet(false);
    console.log("Editar treino:", selectedWorkoutId);
  };

  const handleDuplicateWorkout = async () => {
    setShowActionsheet(false);
    if (!selectedWorkoutId) return;

    try {
      await workoutStorage.duplicate(selectedWorkoutId);
      await loadWorkouts();
      Alert.alert("Sucesso", "Treino duplicado com sucesso!");
    } catch (error) {
      console.error("Erro ao duplicar treino:", error);
      Alert.alert("Erro", "Não foi possível duplicar o treino.");
    }
  };

  const handleDeleteWorkout = () => {
    setShowActionsheet(false);
    if (!selectedWorkoutId) return;

    const workout = workouts.find((w) => w.id === selectedWorkoutId);
    if (!workout) return;

    Alert.alert(
      "Deletar Treino",
      `Tem certeza que deseja deletar "${workout.name}"? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              await workoutStorage.delete(selectedWorkoutId);
              await loadWorkouts();
            } catch (error) {
              console.error("Erro ao deletar treino:", error);
              Alert.alert("Erro", "Não foi possível deletar o treino.");
            }
          },
        },
      ]
    );
  };

  return {
    workouts,
    isLoading,
    showActionsheet,
    setShowActionsheet,
    handleCreateWorkout,
    handleStartWorkout,
    handleWorkoutMenu,
    handleEditWorkout,
    handleDuplicateWorkout,
    handleDeleteWorkout,
  };
}
