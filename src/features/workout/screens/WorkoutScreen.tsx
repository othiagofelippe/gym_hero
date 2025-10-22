import { WorkoutCard, WorkoutMenuActionsheet } from "@/features/workout/components";
import { useWorkouts } from "@/features/workout/hooks";
import { LoadingState } from "@/shared/components/LoadingState";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Dumbbell, Plus } from "lucide-react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutScreen() {
  const {
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
  } = useWorkouts();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <VStack className="flex-1 bg-background-primary">
          <LoadingState icon={Dumbbell} message="Carregando seus treinos..." />
        </VStack>
      </SafeAreaView>
    );
  }

  if (workouts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <VStack
          className="flex-1 bg-background-primary p-6 justify-center items-center"
          space="xl"
        >
          <VStack space="md" className="items-center">
            <Dumbbell size={80} color="rgb(249, 115, 22)" />
            <Text size="3xl" bold className="text-text-headline text-center">
              Meus Treinos
            </Text>
            <Text size="md" className="text-text-body text-center">
              Você ainda não tem treinos criados
            </Text>
          </VStack>

          <Button
            onPress={handleCreateWorkout}
            className="bg-brand w-full mt-8"
            size="xl"
          >
            <Plus size={24} color="white" className="mr-2" />
            <ButtonText className="text-white text-lg">Criar Treino</ButtonText>
          </Button>
        </VStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary">
        <VStack className="p-6 pb-4" space="xs">
          <Text size="3xl" bold className="text-text-headline">
            Meus Treinos
          </Text>
          <Text size="sm" className="text-text-body">
            {workouts.length} treino(s) criado(s)
          </Text>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <VStack space="md" className="pb-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onStart={handleStartWorkout}
                onMenuPress={handleWorkoutMenu}
              />
            ))}
          </VStack>
        </ScrollView>

        <VStack className="p-6 pt-4 border-t border-border-primary">
          <Button onPress={handleCreateWorkout} className="bg-brand" size="xl">
            <Plus size={24} color="white" />
            <ButtonText className="text-white text-lg ml-2">
              Criar Novo Treino
            </ButtonText>
          </Button>
        </VStack>
      </VStack>

      <WorkoutMenuActionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
        onEdit={handleEditWorkout}
        onDuplicate={handleDuplicateWorkout}
        onDelete={handleDeleteWorkout}
      />
    </SafeAreaView>
  );
}
