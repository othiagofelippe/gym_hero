import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { ExerciseSelectableCard } from "@/features/workout/components";
import { useExerciseSelection } from "@/features/workout/hooks";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ListRenderItem } from "react-native";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

interface Exercise {
  id: string;
  name: string;
}

export default function SelectExercisesScreen() {
  const { muscleGroup } = useLocalSearchParams<{ muscleGroup: string }>();

  const {
    selectedExercises,
    exercises,
    groupName,
    toggleExercise,
    handleNext,
  } = useExerciseSelection(muscleGroup);

  const renderExerciseItem: ListRenderItem<Exercise> = ({ item }) => (
    <ExerciseSelectableCard
      id={item.id}
      name={item.name}
      isSelected={selectedExercises.includes(item.id)}
      onToggle={toggleExercise}
    />
  );

  return (
    <SafeAreaWrapper edges={["top"]}>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs">
            <Text
              size="3xl"
              bold
              className="text-text-headline dark:text-dark-text-headline"
            >
              Selecione os Exercícios
            </Text>
            <Text size="md" className="text-text-body dark:text-dark-text-body">
              {groupName} • {selectedExercises.length} selecionado(s)
            </Text>
          </VStack>
        </VStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExerciseItem}
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 8,
            paddingBottom: 24,
          }}
        />

        {selectedExercises.length > 0 && (
          <VStack className="p-6 pt-4 border-t border-border-primary dark:border-dark-border-primary">
            <Button onPress={handleNext} className="bg-accent-brand" size="xl">
              <ButtonText className="text-white text-lg">
                Próximo ({selectedExercises.length})
              </ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaWrapper>
  );
}
