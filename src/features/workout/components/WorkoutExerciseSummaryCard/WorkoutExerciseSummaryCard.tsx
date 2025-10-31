import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import type { WorkoutExerciseSummaryCardProps } from ".";

export function WorkoutExerciseSummaryCard({
  index,
  name,
  sets,
  reps,
  rest,
}: WorkoutExerciseSummaryCardProps) {
  return (
    <HStack
      space="md"
      className="bg-background-secondary dark:bg-dark-background-secondary p-4 rounded-xl border-2 border-border-primary dark:border-dark-border-primary items-center"
    >
      <VStack className="bg-accent-brand/20 dark:bg-accent-brand/30 w-10 h-10 rounded-full items-center justify-center">
        <Text size="sm" bold className="text-accent-brand dark:text-dark-text-headline">
          {index + 1}
        </Text>
      </VStack>

      <VStack className="flex-1" space="xs">
        <Text size="md" bold className="text-text-headline dark:text-dark-text-headline">
          {name}
        </Text>
        <HStack space="md">
          <Text size="xs" className="text-text-span dark:text-dark-text-span">
            {sets}x{reps}
          </Text>
          <Text size="xs" className="text-text-span dark:text-dark-text-span">
            • {rest}s descanso
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
