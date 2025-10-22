import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Pause, Play, SkipForward } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Vibration, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast, useConfirmDialog } from "@/shared/hooks";

interface ExerciseConfig {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
}

interface Workout {
  id: string;
  name: string;
  muscleGroup: string;
  muscleGroupName: string;
  exercises: ExerciseConfig[];
  createdAt: string;
  lastPerformed?: string;
  timesCompleted: number;
}

const muscleGroupEmojis: Record<string, string> = {
  chest: "💪",
  back: "🦾",
  legs: "🦵",
  shoulders: "💪",
  biceps: "💪",
  triceps: "💪",
  abs: "🔥",
};

export default function ExecuteWorkoutScreen() {
  const params = useLocalSearchParams<{ workoutId: string }>();
  const workoutId = params.workoutId;
  const toast = useToast();
  const confirm = useConfirmDialog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<boolean[]>([]);

  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    loadWorkout();
  }, []);

  useEffect(() => {
    if (isTimerRunning && restTimeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, restTimeLeft]);

  const loadWorkout = async () => {
    try {
      const workoutsJson = await AsyncStorage.getItem("@gym_hero:workouts");
      if (workoutsJson) {
        const workouts: Workout[] = JSON.parse(workoutsJson);
        const foundWorkout = workouts.find((w) => w.id === workoutId);
        if (foundWorkout) {
          setWorkout(foundWorkout);
          setCompletedSets(
            new Array(foundWorkout.exercises[0].sets).fill(false)
          );
        }
      }
    } catch (error) {
      console.error("Erro ao carregar treino:", error);
      toast.error("Erro", "Não foi possível carregar o treino.");
      router.back();
    }
  };

  const handleCompleteSet = () => {
    if (!workout) return;

    const currentExercise = workout.exercises[currentExerciseIndex];
    const newCompletedSets = [...completedSets];
    newCompletedSets[currentSetIndex] = true;
    setCompletedSets(newCompletedSets);

    if (currentSetIndex + 1 >= currentExercise.sets) {
      handleNextExercise();
    } else {
      setCurrentSetIndex(currentSetIndex + 1);
      startRestTimer(currentExercise.rest);
    }
  };

  const startRestTimer = (seconds: number) => {
    setRestTimeLeft(seconds);
    setIsResting(true);
    setIsTimerRunning(false);
  };

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
    Vibration.vibrate([0, 500, 200, 500]);
  };

  const handleStartPauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleSkipRest = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsResting(false);
    setIsTimerRunning(false);
  };

  const handleContinueAfterRest = () => {
    setIsResting(false);
    setIsTimerRunning(false);
  };

  const handleNextExercise = () => {
    if (!workout) return;

    if (currentExerciseIndex + 1 >= workout.exercises.length) {
      handleCompleteWorkout();
    } else {
      const nextExerciseIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextExerciseIndex);
      setCurrentSetIndex(0);
      setCompletedSets(
        new Array(workout.exercises[nextExerciseIndex].sets).fill(false)
      );
    }
  };

  const handleCompleteWorkout = async () => {
    await confirm({
      title: "Parabéns!",
      message: "Treino concluído!",
      confirmText: "OK",
      confirmAction: "positive",
    });
    router.back();
  };

  const handlePause = async () => {
    const confirmed = await confirm({
      title: "Pausar Treino",
      message: "Deseja pausar o treino?",
      confirmText: "Sair",
      cancelText: "Continuar",
      confirmAction: "negative",
    });

    if (confirmed) {
      router.back();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!workout) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <VStack className="flex-1 bg-background-primary justify-center items-center">
          <Text className="text-text-body">Carregando...</Text>
        </VStack>
      </SafeAreaView>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const progressPercentage =
    ((currentExerciseIndex + 1) / totalExercises) * 100;
  const emoji = muscleGroupEmojis[workout.muscleGroup] || "💪";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <VStack className="flex-1 bg-background-primary">
        <HStack className="px-6 py-4 justify-between items-center border-b border-border-primary">
          <VStack className="flex-1">
            <Text size="lg" bold className="text-text-headline">
              {emoji} {workout.name}
            </Text>
            <Text size="sm" className="text-text-body">
              Exercício {currentExerciseIndex + 1}/{totalExercises}
            </Text>
          </VStack>
          <TouchableOpacity onPress={handlePause} activeOpacity={0.7}>
            <Pause size={24} color="rgb(249, 115, 22)" />
          </TouchableOpacity>
        </HStack>

        <VStack className="px-6 py-4">
          <View
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "rgb(63, 63, 70)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: "rgb(249, 115, 22)",
              }}
            />
          </View>
          <Text size="xs" className="text-text-span mt-2">
            {Math.round(progressPercentage)}% completo
          </Text>
        </VStack>

        {isResting ? (
          <>
            <VStack className="flex-1 justify-center items-center px-6" space="2xl">
              <VStack className="items-center" space="xl">
                <View style={{ position: "relative", width: 300, height: 300 }}>
                  <View
                    style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      borderRadius: 150,
                      borderWidth: 8,
                      borderColor: "rgb(63, 63, 70)",
                      backgroundColor: "rgb(0, 0, 0)",
                    }}
                  />

                  <View
                    style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      borderRadius: 150,
                      borderWidth: 8,
                      borderColor: "transparent",
                      borderTopColor: "rgb(249, 115, 22)",
                      borderRightColor: "rgb(249, 115, 22)",
                      borderBottomColor: "rgb(249, 115, 22)",
                      borderLeftColor: "rgb(249, 115, 22)",
                      transform: [
                        {
                          rotate: `${
                            -90 +
                            (360 *
                              (workout.exercises[currentExerciseIndex].rest - restTimeLeft)) /
                              workout.exercises[currentExerciseIndex].rest
                          }deg`,
                        },
                      ],
                    }}
                  />

                  <View
                    style={{
                      position: "absolute",
                      width: 284,
                      height: 284,
                      top: 8,
                      left: 8,
                      borderRadius: 142,
                      backgroundColor: "rgb(0, 0, 0)",
                    }}
                  />

                  <View
                    style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text className="text-white font-bold" size="6xl">
                      {formatTime(restTimeLeft)}
                    </Text>
                    {restTimeLeft === 0 && (
                      <Text size="lg" className="text-brand">
                        Pronto! 🔥
                      </Text>
                    )}
                  </View>
                </View>

                <VStack className="items-center" space="sm">
                  <Text size="xl" className="text-text-body">
                    💤 Descanso
                  </Text>
                  <Text size="md" className="text-text-span text-center">
                    Próximo: Série {currentSetIndex + 1} de {currentExercise.sets}
                  </Text>
                  <Text size="sm" className="text-text-span text-center">
                    {currentExercise.name}
                  </Text>
                </VStack>
              </VStack>
            </VStack>

            <VStack className="p-6 border-t border-border-primary" space="sm">
              {restTimeLeft === 0 ? (
                <Button
                  onPress={handleContinueAfterRest}
                  className="bg-brand"
                  size="xl"
                >
                  <ButtonText className="text-white text-lg">
                    Iniciar Próxima Série
                  </ButtonText>
                </Button>
              ) : (
                <>
                  <Button
                    onPress={handleStartPauseTimer}
                    className="bg-brand"
                    size="xl"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause size={24} color="white" />
                        <ButtonText className="text-white text-lg ml-2">
                          Pausar
                        </ButtonText>
                      </>
                    ) : (
                      <>
                        <Play size={24} color="white" />
                        <ButtonText className="text-white text-lg ml-2">
                          Iniciar
                        </ButtonText>
                      </>
                    )}
                  </Button>

                  <Button
                    onPress={handleSkipRest}
                    variant="outline"
                    className="border-border-primary"
                    size="lg"
                  >
                    <SkipForward size={20} color="rgb(161, 161, 170)" />
                    <ButtonText className="text-text-body ml-2">
                      Pular Descanso
                    </ButtonText>
                  </Button>
                </>
              )}
            </VStack>
          </>
        ) : (
          <>
            <VStack className="flex-1 px-6 justify-center" space="xl">
              <VStack className="items-center" space="md">
                <View
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "rgb(39, 39, 42)",
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: "rgb(63, 63, 70)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 80 }}>💪</Text>
                </View>

                <VStack className="items-center" space="xs">
                  <Text
                    size="3xl"
                    bold
                    className="text-text-headline text-center"
                  >
                    {currentExercise.name}
                  </Text>
                  <Text size="md" className="text-text-body">
                    {currentExercise.reps} repetições
                  </Text>
                </VStack>
              </VStack>

              <VStack
                className="p-5 rounded-2xl bg-background-secondary border-2 border-border-primary"
                space="md"
              >
                <VStack className="items-center" space="sm">
                  <Text size="xl" bold className="text-text-headline">
                    Série {currentSetIndex + 1} de {currentExercise.sets}
                  </Text>

                  <HStack space="md" className="items-center justify-center">
                    {Array.from({ length: currentExercise.sets }).map(
                      (_, index) => {
                        const isCompleted = completedSets[index];
                        const isCurrent = index === currentSetIndex;

                        return (
                          <View
                            key={index}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              backgroundColor: isCompleted
                                ? "rgb(249, 115, 22)"
                                : "rgb(39, 39, 42)",
                              borderWidth: 2,
                              borderColor: isCurrent
                                ? "rgb(249, 115, 22)"
                                : "rgb(63, 63, 70)",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isCompleted ? (
                              <Text style={{ color: "white", fontSize: 20 }}>
                                ✓
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  color: isCurrent
                                    ? "rgb(249, 115, 22)"
                                    : "rgb(161, 161, 170)",
                                  fontSize: 16,
                                  fontWeight: "bold",
                                }}
                              >
                                {index + 1}
                              </Text>
                            )}
                          </View>
                        );
                      }
                    )}
                  </HStack>
                </VStack>

                <VStack
                  className="p-3 rounded-lg bg-background-primary/50"
                  space="xs"
                >
                  <Text size="sm" className="text-text-body text-center">
                    💤 Descanso: {currentExercise.rest}s após esta série
                  </Text>
                </VStack>
              </VStack>
            </VStack>

            <VStack className="p-6 border-t border-border-primary">
              <Button
                onPress={handleCompleteSet}
                className="bg-brand"
                size="xl"
              >
                <ButtonText className="text-white text-lg">
                  ✓ Completei a Série
                </ButtonText>
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
}
