import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Clock, MoreVertical, Play } from "lucide-react-native";
import { TouchableOpacity, Image } from "react-native";
import { formatLastPerformed, calculateEstimatedTime } from "../../utils";
import { useMuscleGroups } from "../../hooks";
import type { WorkoutCardProps } from "./WorkoutCard.types";

export function WorkoutCard({
  workout,
  onStart,
  onMenuPress,
}: WorkoutCardProps) {
  const { getMuscleGroupById } = useMuscleGroups();
  const muscleGroup = getMuscleGroupById(workout.muscleGroup);
  const estimatedTime = calculateEstimatedTime(workout.exercises);

  return (
    <VStack
      className="p-5 rounded-2xl bg-background-secondary border-2 border-border-primary"
      space="md"
    >
      <VStack space="sm">
        <HStack space="sm" className="items-center">
          {muscleGroup?.imageUrl && (
            <Image
              source={{ uri: muscleGroup.imageUrl }}
              style={{ width: 32, height: 32, resizeMode: "contain" }}
            />
          )}
          <Text size="2xl" bold className="text-text-headline flex-1">
            {workout.name}
          </Text>
        </HStack>

        <VStack space="xs">
          <Text size="sm" className="text-text-body">
            📋 {workout.muscleGroupName} • {workout.exercises.length}{" "}
            exercício(s)
          </Text>
          <HStack space="xs" className="items-center">
            <Clock size={14} color="rgb(161, 161, 170)" />
            <Text size="sm" className="text-text-body">
              ~{estimatedTime} minutos
            </Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack className="p-3 rounded-lg bg-background-primary/50">
        <Text size="xs" className="text-text-span">
          Última vez: {formatLastPerformed(workout.lastPerformed)}
        </Text>
      </VStack>

      <HStack space="sm" className="items-center">
        <Button
          onPress={() => onStart(workout.id)}
          className="bg-brand flex-1"
          size="lg"
        >
          <Play size={18} color="white" />
          <ButtonText className="text-white ml-2">Começar Treino</ButtonText>
        </Button>

        <TouchableOpacity
          onPress={() => onMenuPress(workout.id)}
          activeOpacity={0.7}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: "rgb(39, 39, 42)",
            borderWidth: 2,
            borderColor: "rgb(63, 63, 70)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoreVertical size={20} color="rgb(161, 161, 170)" />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
