import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useConfirmDialog, useToast } from "@/shared/hooks";
import { workoutService } from "../services/workoutService";
import type { Workout } from "../types";

export function useWorkouts() {
  const { user } = useAuth();
  const confirm = useConfirmDialog();
  const toast = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setWorkouts([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const initialWorkouts = await workoutService.getWorkouts(user.uid);
        if (isMounted) {
          setWorkouts(initialWorkouts);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar treinos:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWorkouts();

    const unsubscribe = workoutService.subscribeToWorkouts(
      user.uid,
      (updatedWorkouts) => {
        if (isMounted) {
          setWorkouts(updatedWorkouts);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user]);

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
    if (!selectedWorkoutId || !user) return;

    const workout = workouts.find((w) => w.id === selectedWorkoutId);
    if (!workout) return;

    const confirmed = await confirm({
      title: "Duplicar Treino",
      message: `Deseja criar uma cópia de "${workout.name}"?`,
      confirmText: "Duplicar",
      cancelText: "Cancelar",
      confirmAction: "positive",
    });

    if (confirmed) {
      try {
        await workoutService.duplicateWorkout(user.uid, workout);

        const updatedWorkouts = await workoutService.getWorkouts(user.uid);
        setWorkouts(updatedWorkouts);

        toast.success("Sucesso", "Treino duplicado com sucesso!");
      } catch (error) {
        console.error("Erro ao duplicar treino:", error);
        toast.error("Erro", "Não foi possível duplicar o treino.");
      }
    }
  };

  const handleDeleteWorkout = async () => {
    setShowActionsheet(false);
    if (!selectedWorkoutId || !user) return;

    const workout = workouts.find((w) => w.id === selectedWorkoutId);
    if (!workout) return;

    const confirmed = await confirm({
      title: "Deletar Treino",
      message: `Tem certeza que deseja deletar "${workout.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Deletar",
      cancelText: "Cancelar",
      confirmAction: "negative",
    });

    if (confirmed) {
      try {
        await workoutService.deleteWorkout(user.uid, selectedWorkoutId);

        const updatedWorkouts = await workoutService.getWorkouts(user.uid);
        setWorkouts(updatedWorkouts);
      } catch (error) {
        console.error("Erro ao deletar treino:", error);
        toast.error("Erro", "Não foi possível deletar o treino.");
      }
    }
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
