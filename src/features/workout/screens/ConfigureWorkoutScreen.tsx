import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { Stepper } from "@/shared/components/Stepper";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/shared/components/ui/actionsheet";
import { ExerciseConfigCard } from "@/features/workout/components";
import type { ExerciseConfig } from "@/features/workout/types";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfigureWorkoutScreen() {
  const params = useLocalSearchParams<{
    muscleGroup: string;
    exercises: string;
  }>();

  const muscleGroup = params.muscleGroup || "";
  const exercises = params.exercises ? JSON.parse(params.exercises) : [];

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
      exercises.map((ex: { id: string; name: string }) => ({
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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs">
            <Text size="3xl" bold className="text-text-headline">
              Configure seu Treino
            </Text>
            <Text size="md" className="text-text-body">
              {exercises.length} exercício(s) selecionado(s)
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <VStack space="lg" className="pb-6">
            <VStack
              className="p-4 rounded-xl bg-background-secondary border-2 border-border-primary"
              space="md"
            >
              <Text size="lg" bold className="text-text-headline">
                📋 Configuração Padrão
              </Text>

              <VStack space="sm">
                <HStack className="justify-between items-center">
                  <Text size="md" className="text-text-body">
                    Séries
                  </Text>
                  <Stepper
                    value={defaultSets}
                    onChange={setDefaultSets}
                    min={1}
                    max={10}
                  />
                </HStack>

                <HStack className="justify-between items-center">
                  <Text size="md" className="text-text-body">
                    Repetições
                  </Text>
                  <Stepper
                    value={defaultReps}
                    onChange={setDefaultReps}
                    min={1}
                    max={50}
                  />
                </HStack>

                <HStack className="justify-between items-center">
                  <Text size="md" className="text-text-body">
                    Descanso
                  </Text>
                  <Stepper
                    value={defaultRest}
                    onChange={setDefaultRest}
                    min={15}
                    max={300}
                    step={15}
                    suffix="s"
                  />
                </HStack>
              </VStack>

              <HStack className="justify-between items-center pt-2 border-t border-border-primary">
                <Text size="sm" className="text-text-body">
                  Aplicar para todos
                </Text>
                <Switch
                  value={applyToAll}
                  onValueChange={setApplyToAll}
                  trackColor={{ false: "#3f3f46", true: "rgb(249, 115, 22)" }}
                  thumbColor={applyToAll ? "#fff" : "#f4f4f5"}
                />
              </HStack>
            </VStack>

            <VStack space="xs">
              <Text size="sm" bold className="text-text-span uppercase">
                Exercícios
              </Text>

              <VStack space="sm">
                {exerciseConfigs.map((config) => (
                  <ExerciseConfigCard
                    key={config.id}
                    exercise={config}
                    onEdit={handleEditExercise}
                    disabled={applyToAll}
                  />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>

        <VStack className="p-6 border-t border-border-primary">
          <Button onPress={handleNext} className="bg-brand" size="xl">
            <ButtonText className="text-white text-lg">Próximo</ButtonText>
          </Button>
        </VStack>
      </VStack>

      <Actionsheet isOpen={showActionsheet} onClose={handleCloseActionsheet}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="bg-background-primary">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator className="bg-border-primary" />
          </ActionsheetDragIndicatorWrapper>

          <VStack className="w-full p-6" space="lg">
            <VStack space="xs">
              <Text size="2xl" bold className="text-text-headline">
                {editingExercise?.name}
              </Text>
              <Text size="sm" className="text-text-span">
                Configure as séries, repetições e descanso
              </Text>
            </VStack>

            <VStack space="md">
              <HStack className="justify-between items-center">
                <Text size="md" className="text-text-body">
                  Séries
                </Text>
                <Stepper
                  value={tempSets}
                  onChange={setTempSets}
                  min={1}
                  max={10}
                />
              </HStack>

              <HStack className="justify-between items-center">
                <Text size="md" className="text-text-body">
                  Repetições
                </Text>
                <Stepper
                  value={tempReps}
                  onChange={setTempReps}
                  min={1}
                  max={50}
                />
              </HStack>

              <HStack className="justify-between items-center">
                <Text size="md" className="text-text-body">
                  Descanso
                </Text>
                <Stepper
                  value={tempRest}
                  onChange={setTempRest}
                  min={15}
                  max={300}
                  step={15}
                  suffix="s"
                />
              </HStack>
            </VStack>

            <Button onPress={handleSaveExercise} className="bg-brand" size="xl">
              <ButtonText className="text-white text-lg">Aplicar</ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
}
