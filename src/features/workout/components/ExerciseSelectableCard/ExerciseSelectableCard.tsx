import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Check } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import type { ExerciseSelectableCardProps } from "./ExerciseSelectableCard.types";

export function ExerciseSelectableCard({
  id,
  name,
  isSelected,
  onToggle,
}: ExerciseSelectableCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(id)}
      activeOpacity={0.7}
    >
      <HStack
        className={`p-4 rounded-xl items-center justify-between ${
          isSelected
            ? "bg-brand/10 border-2 border-brand"
            : "bg-background-secondary border-2 border-border-primary"
        }`}
      >
        <Text
          size="lg"
          className={
            isSelected
              ? "text-brand font-bold"
              : "text-text-headline"
          }
        >
          {name}
        </Text>
        {isSelected && (
          <VStack className="w-6 h-6 rounded-full bg-brand items-center justify-center">
            <Check size={16} color="white" />
          </VStack>
        )}
      </HStack>
    </TouchableOpacity>
  );
}
