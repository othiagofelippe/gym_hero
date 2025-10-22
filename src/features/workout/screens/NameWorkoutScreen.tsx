import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Input, InputField } from "@/shared/components/ui/input";
import { Badge, BadgeText } from "@/shared/components/ui/badge";
import { useLocalSearchParams, router } from "expo-router";
import { PartyPopper } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { workoutService } from "../services/workoutService";
import { useMuscleGroups } from "../hooks";
import { useToast } from "@/shared/hooks";

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

const SUGGESTIONS_BY_GROUP: Record<string, Array<{ emoji?: string; text: string }>> = {
  chest: [
    { emoji: "💪", text: "Push Day" },
    { text: "Treino de Peito" },
    { emoji: "🔥", text: "Treino A" },
    { emoji: "📅", text: "Peito" },
  ],
  back: [
    { emoji: "💪", text: "Pull Day" },
    { text: "Treino de Costas" },
    { emoji: "🔥", text: "Treino B" },
    { emoji: "📅", text: "Costas" },
  ],
  legs: [
    { emoji: "🦵", text: "Leg Day" },
    { text: "Treino de Pernas" },
    { emoji: "🔥", text: "Treino C" },
    { emoji: "📅", text: "Pernas" },
  ],
  shoulders: [
    { emoji: "💪", text: "Shoulder Day" },
    { text: "Treino de Ombros" },
    { emoji: "🔥", text: "Treino D" },
    { emoji: "📅", text: "Ombros" },
  ],
  biceps: [
    { text: "Treino de Bíceps" },
    { emoji: "🔥", text: "Treino E" },
    { text: "Bíceps" },
  ],
  triceps: [
    { text: "Treino de Tríceps" },
    { emoji: "🔥", text: "Treino F" },
    { text: "Tríceps" },
  ],
  abs: [
    { emoji: "🔥", text: "Core Day" },
    { text: "Treino de Abdômen" },
    { text: "Abdômen" },
  ],
};

export default function NameWorkoutScreen() {
  const { user } = useAuth();
  const { getMuscleGroupName } = useMuscleGroups();
  const toast = useToast();
  const params = useLocalSearchParams<{
    muscleGroup: string;
    exercises: string;
  }>();

  const muscleGroup = params.muscleGroup || "";
  const exercises: ExerciseConfig[] = params.exercises ? JSON.parse(params.exercises) : [];

  const [workoutName, setWorkoutName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const suggestions = SUGGESTIONS_BY_GROUP[muscleGroup] || [
    { emoji: "🔥", text: "Treino A" },
    { text: "Meu Treino" },
  ];

  const muscleGroupName = getMuscleGroupName(muscleGroup);

  const estimatedTime = exercises.reduce((total, ex) => {
    const timePerSet = 180 + ex.rest;
    return total + ex.sets * timePerSet;
  }, 0);
  const estimatedMinutes = Math.round(estimatedTime / 60);

  const handleSaveWorkout = async () => {
    if (!workoutName.trim()) return;

    if (!user) {
      toast.error("Erro", "Você precisa estar logado para salvar treinos.");
      return;
    }

    setIsSaving(true);

    try {
      const workout: Workout = {
        id: '',
        name: workoutName.trim(),
        muscleGroup,
        muscleGroupName,
        exercises,
        createdAt: '',
        timesCompleted: 0,
      };

      await workoutService.saveWorkout(user.uid, workout);

      console.log("✅ Treino salvo com sucesso!");

      router.replace("/(tabs)/(workout)");
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
      toast.error("Erro", "Erro ao salvar treino. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs" className="items-center">
            <PartyPopper size={60} color="rgb(249, 115, 22)" />
            <Text size="3xl" bold className="text-center text-text-headline">
              Quase lá!
            </Text>
            <Text size="md" className="text-center text-text-body">
              Dê um nome ao seu treino
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <VStack space="lg" className="pb-6">
            <VStack space="sm">
              <Text size="sm" bold className="text-text-heading">
                Nome do Treino
              </Text>
              <Input className="border-border-primary bg-background-secondary">
                <InputField
                  placeholder="Ex: Treino A, Push Day..."
                  value={workoutName}
                  onChangeText={setWorkoutName}
                  className="text-text-body"
                  autoFocus
                />
              </Input>
            </VStack>

            <VStack space="sm">
              <Text size="sm" className="text-text-span">
                Toque para usar:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setWorkoutName(suggestion.text)}
                    activeOpacity={0.7}
                  >
                    <Badge
                      variant="outline"
                      action="muted"
                      className="border-border-primary"
                    >
                      <BadgeText className="text-text-headline">
                        {suggestion.emoji && `${suggestion.emoji} `}
                        {suggestion.text}
                      </BadgeText>
                    </Badge>
                  </TouchableOpacity>
                ))}
              </View>
            </VStack>

            <VStack
              className="p-4 rounded-xl bg-background-secondary border-2 border-border-primary"
              space="sm"
            >
              <Text size="md" bold className="text-text-headline">
                📝 Resumo
              </Text>
              <VStack space="xs">
                <Text size="sm" className="text-text-body">
                  • Grupo: {muscleGroupName}
                </Text>
                <Text size="sm" className="text-text-body">
                  • {exercises.length} exercício(s)
                </Text>
                <Text size="sm" className="text-text-body">
                  • Tempo estimado: ~{estimatedMinutes} min
                </Text>
              </VStack>
            </VStack>

            <VStack space="xs">
              <Text size="sm" bold className="text-text-span uppercase">
                Exercícios
              </Text>
              <VStack space="xs">
                {exercises.map((exercise, index) => (
                  <VStack
                    key={exercise.id}
                    className="p-3 rounded-lg bg-background-secondary"
                    space="xs"
                  >
                    <Text size="sm" bold className="text-text-headline">
                      {index + 1}. {exercise.name}
                    </Text>
                    <Text size="xs" className="text-text-span">
                      {exercise.sets} séries × {exercise.reps} reps • {exercise.rest}s
                      descanso
                    </Text>
                  </VStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>

        <VStack className="p-6 border-t border-border-primary">
          <Button
            onPress={handleSaveWorkout}
            className="bg-brand"
            size="xl"
            disabled={!workoutName.trim() || isSaving}
          >
            <ButtonText className="text-white text-lg">
              {isSaving ? "Salvando..." : "Salvar Treino"}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
