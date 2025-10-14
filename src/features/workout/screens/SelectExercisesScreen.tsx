import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { ExerciseSelectableCard } from "@/features/workout/components";
import { useExerciseSelection } from "@/features/workout/hooks";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectExercisesScreen() {
  const { muscleGroup } = useLocalSearchParams<{ muscleGroup: string }>();

  const {
    selectedExercises,
    exercises,
    groupName,
    toggleExercise,
    handleNext,
  } = useExerciseSelection(muscleGroup);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs">
            <Text size="3xl" bold className="text-text-headline">
              Selecione os Exercícios
            </Text>
            <Text size="md" className="text-text-body">
              {groupName} • {selectedExercises.length} selecionado(s)
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <VStack space="sm" className="pb-6">
            {exercises.map((exercise) => (
              <ExerciseSelectableCard
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                isSelected={selectedExercises.includes(exercise.id)}
                onToggle={toggleExercise}
              />
            ))}
          </VStack>
        </ScrollView>

        {selectedExercises.length > 0 && (
          <VStack className="p-6 border-t border-border-primary">
            <Button onPress={handleNext} className="bg-brand" size="xl">
              <ButtonText className="text-white text-lg">
                Próximo ({selectedExercises.length})
              </ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
}
