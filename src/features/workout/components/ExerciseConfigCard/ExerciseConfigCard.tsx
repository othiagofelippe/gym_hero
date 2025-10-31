import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Edit2 } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import type { ExerciseConfigCardProps } from ".";

export function ExerciseConfigCard({
  exercise,
  onEdit,
  disabled = false,
}: ExerciseConfigCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onEdit(exercise.id)}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <HStack
        className={`p-4 rounded-xl justify-between items-center ${
          disabled
            ? "bg-background-secondary dark:bg-dark-background-secondary"
            : "bg-background-secondary dark:bg-dark-background-secondary border-2 border-border-primary dark:border-dark-border-primary"
        }`}
      >
        <VStack space="xs" className="flex-1">
          <Text
            size="md"
            bold
            className="text-text-headline dark:text-dark-text-headline"
          >
            {exercise.name}
          </Text>
          <Text size="sm" className="text-text-span dark:text-dark-text-span">
            {exercise.sets} séries • {exercise.reps} reps • {exercise.rest}s
          </Text>
        </VStack>

        {!disabled && <Edit2 size={20} color="rgb(249, 115, 22)" />}
      </HStack>
    </TouchableOpacity>
  );
}
