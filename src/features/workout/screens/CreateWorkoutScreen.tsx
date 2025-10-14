import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { MuscleGroupCard } from "@/features/workout/components";
import { MUSCLE_GROUPS } from "@/features/workout/constants";
import { router } from "expo-router";
import { Dumbbell } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateWorkoutScreen() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs" className="items-center">
            <Dumbbell size={60} color="rgb(249, 115, 22)" />
            <Text size="3xl" bold className="text-center text-text-headline">
              Criar Treino
            </Text>
            <Text size="md" className="text-center text-text-body">
              Selecione o grupo muscular
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 16,
              paddingBottom: 24,
            }}
          >
            {MUSCLE_GROUPS.map((group) => (
              <MuscleGroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                icon={group.icon}
                isSelected={selectedGroup === group.id}
                onSelect={setSelectedGroup}
              />
            ))}
          </View>
        </ScrollView>

        {selectedGroup && (
          <VStack className="p-6 border-t border-border-primary">
            <Button
              onPress={() => router.push(`/(tabs)/(workout)/${selectedGroup}`)}
              className="bg-brand"
              size="xl"
            >
              <ButtonText className="text-white text-lg">Próximo</ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
}
