import { VStack } from "@/shared/components/ui/vstack";
import { Text } from "@/shared/components/ui/text";
import WeeklyCheckIn from "@/shared/components/WeeklyCheckIn";

export default function HomeScreen() {
  // Exemplo: dias 1 (seg), 3 (qua) e 5 (sex) marcados
  const checkedDays = [1, 3, 5];

  return (
    <VStack className="flex-1 bg-background-primary p-6">
      <Text size="3xl" bold className="text-text-headline mb-4">
        Gym Hero
      </Text>

      <WeeklyCheckIn checkedDays={checkedDays} />
    </VStack>
  );
}
