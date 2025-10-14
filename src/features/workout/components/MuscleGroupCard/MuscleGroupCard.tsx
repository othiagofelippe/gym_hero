import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { TouchableOpacity } from "react-native";
import type { MuscleGroupCardProps } from "./MuscleGroupCard.types";

export function MuscleGroupCard({
  id,
  name,
  icon,
  isSelected,
  onSelect,
}: MuscleGroupCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      activeOpacity={0.7}
      style={{
        width: "47%",
        aspectRatio: 1,
      }}
    >
      <VStack
        className={`h-full rounded-2xl items-center justify-center ${
          isSelected
            ? "border-4 border-brand bg-brand/10"
            : "border-2 border-border-primary bg-background-secondary"
        }`}
        space="sm"
      >
        <Text size="4xl">{icon}</Text>
        <Text
          size="md"
          bold
          className={`text-center ${
            isSelected ? "text-brand" : "text-text-headline"
          }`}
        >
          {name}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
}
