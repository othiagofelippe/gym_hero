import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, Image } from "react-native";
import { formatLastPerformed, calculateEstimatedTime } from "../../utils";
import { useMuscleGroups } from "../../hooks";
import type { WorkoutCardProps } from ".";

export function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const { getMuscleGroupById } = useMuscleGroups();
  const muscleGroup = getMuscleGroupById(workout.muscleGroup);
  const estimatedTime = calculateEstimatedTime(workout.exercises);

  return (
    <TouchableOpacity onPress={() => onPress(workout.id)} activeOpacity={0.7}>
      <VStack
        className="p-5 rounded-2xl bg-background-secondary dark:bg-dark-background-secondary border-2 border-border-primary dark:border-dark-border-primary"
        space="md"
      >
        <VStack space="sm">
          <HStack space="sm" className="items-center justify-between">
            <HStack space="sm" className="items-center flex-1">
              {muscleGroup?.imageUrl && (
                <Image
                  source={{ uri: muscleGroup.imageUrl }}
                  style={{ width: 32, height: 32, resizeMode: "contain" }}
                />
              )}
              <Text
                size="2xl"
                bold
                className="text-text-headline dark:text-dark-text-headline flex-1"
              >
                {workout.name}
              </Text>
            </HStack>
            <ChevronRight size={24} color="rgb(161, 161, 170)" />
          </HStack>

          <VStack space="xs">
            <Text size="sm" className="text-text-body dark:text-dark-text-body">
              Grupo: {workout.muscleGroupName} • {workout.exercises.length}{" "}
              exercício(s)
            </Text>
            <Text size="sm" className="text-text-body dark:text-dark-text-body">
              Estimativa: {estimatedTime} minutos
            </Text>
            <Text size="sm" className="text-text-body dark:text-dark-text-body">
              Última vez: {formatLastPerformed(workout.lastPerformed)}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
