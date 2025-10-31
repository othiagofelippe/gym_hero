import { WorkoutCard } from "@/features/workout/components";
import { useWorkouts } from "@/features/workout/hooks";
import type { Workout } from "@/features/workout/types";
import { FlexMascot } from "@/shared/components/FlexMascot";
import { LoadingState } from "@/shared/components/LoadingState";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { COLORS } from "@/shared/constants/theme";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { FlatList, ListRenderItem, RefreshControl } from "react-native";

export default function WorkoutScreen() {
  const router = useRouter();
  const { workouts, isLoading, refetch, handleCreateWorkout } = useWorkouts();

  const handleWorkoutPress = (workoutId: string) => {
    router.push(`/(tabs)/(workout)/details/${workoutId}`);
  };

  if (isLoading) {
    return (
      <SafeAreaWrapper>
        <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary">
          <LoadingState
            variant="workout"
            message="Carregando seus treinos..."
          />
        </VStack>
      </SafeAreaWrapper>
    );
  }

  const renderEmptyState = () => (
    <VStack
      className="flex-1 justify-center items-center px-8 bg-background-primary dark:bg-dark-background-primary"
      space="xl"
    >
      <VStack space="md" className="items-center">
        <FlexMascot variant="sad-disappointed" size="xlarge" />
        <Text
          size="3xl"
          bold
          className="text-text-headline dark:text-dark-text-headline text-center"
        >
          Nenhum Treino Criado
        </Text>
        <Text
          size="md"
          className="text-text-body dark:text-dark-text-body text-center"
        >
          Comece sua jornada criando seu primeiro treino personalizado
        </Text>
      </VStack>

      <Button
        onPress={handleCreateWorkout}
        className="bg-accent-brand w-full mt-8"
        size="xl"
      >
        <Plus size={24} color="white" className="mr-2" />
        <ButtonText className="text-white text-lg">
          Criar Primeiro Treino
        </ButtonText>
      </Button>
    </VStack>
  );

  const renderWorkoutItem: ListRenderItem<Workout> = ({ item }) => (
    <WorkoutCard workout={item} onPress={handleWorkoutPress} />
  );

  return (
    <SafeAreaWrapper edges={["top"]}>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary">
        {workouts.length > 0 && (
          <VStack className="px-6 pt-6 pb-4" space="xs">
            <Text
              size="3xl"
              bold
              className="text-text-headline dark:text-dark-text-headline"
            >
              Meus Treinos
            </Text>
            <Text
              size="sm"
              className="text-text-body dark:text-dark-text-body"
            >
              {workouts.length} treino(s) criado(s)
            </Text>
          </VStack>
        )}

        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkoutItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={
            workouts.length === 0
              ? { flex: 1 }
              : { paddingHorizontal: 24, gap: 12, paddingBottom: 24 }
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              tintColor={COLORS.brand.DEFAULT}
              colors={[COLORS.brand.DEFAULT]}
            />
          }
        />

        {workouts.length > 0 && (
          <VStack className="p-6 pt-4 border-t border-border-primary dark:border-dark-border-primary">
            <Button
              onPress={handleCreateWorkout}
              className="bg-accent-brand"
              size="xl"
            >
              <Plus size={24} color="white" />
              <ButtonText className="text-white text-lg ml-2">
                Criar Novo Treino
              </ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaWrapper>
  );
}
