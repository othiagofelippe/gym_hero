import { BackButton } from "@/shared/components/BackButton";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";
import { FlexMascot } from "@/shared/components/FlexMascot";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { MuscleGroupCard } from "@/features/workout/components";
import { useMuscleGroups } from "@/features/workout/hooks";
import { LoadingState } from "@/shared/components/LoadingState";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function CreateWorkoutScreen() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const { muscleGroups, isLoading } = useMuscleGroups();

  return (
    <SafeAreaWrapper edges={["top"]}>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs" className="items-center">
            <FlexMascot variant="holding-dumbbell" size="medium" />
            <Text
              size="3xl"
              bold
              className="text-center text-text-headline dark:text-dark-text-headline"
            >
              Criar Treino
            </Text>
            <Text
              size="md"
              className="text-center text-text-body dark:text-dark-text-body"
            >
              Selecione o grupo muscular
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6 bg-background-primary dark:bg-dark-background-primary">
          {isLoading ? (
            <LoadingState
              variant="workout"
              message="Carregando grupos musculares..."
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16,
                paddingBottom: 24,
              }}
            >
              {muscleGroups.map((group) => (
                <MuscleGroupCard
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  imageUrl={group.imageUrl}
                  isSelected={selectedGroup === group.id}
                  onSelect={setSelectedGroup}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {selectedGroup && (
          <VStack className="p-6 pt-4 border-t border-border-primary dark:border-dark-border-primary">
            <Button
              onPress={() => router.push(`/(tabs)/(workout)/${selectedGroup}`)}
              className="bg-accent-brand"
              size="xl"
            >
              <ButtonText className="text-white text-lg">Próximo</ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaWrapper>
  );
}
