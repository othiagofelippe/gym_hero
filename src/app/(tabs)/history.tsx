import { VStack } from "@/shared/components/ui/vstack";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { CheckCircle2 } from "lucide-react-native";
import { ScrollView } from "react-native";

const historyData = [
  { id: 1, date: "10/10/2025", day: "Quinta", time: "45min", xp: 150 },
  { id: 2, date: "08/10/2025", day: "Terça", time: "52min", xp: 180 },
  { id: 3, date: "06/10/2025", day: "Domingo", time: "38min", xp: 120 },
  { id: 4, date: "04/10/2025", day: "Sexta", time: "50min", xp: 160 },
  { id: 5, date: "02/10/2025", day: "Quarta", time: "42min", xp: 140 },
];

export default function HistoryScreen() {
  return (
    <VStack className="flex-1 bg-background-primary">
      <VStack className="p-6 pb-4">
        <Text size="3xl" bold className="text-text-headline">
          Histórico
        </Text>
        <Text size="sm" className="text-text-body mt-1">
          Seus treinos realizados
        </Text>
      </VStack>

      <ScrollView className="flex-1 px-6">
        <VStack space="md" className="pb-6">
          {historyData.map((item) => (
            <HStack
              key={item.id}
              space="md"
              className="bg-background-secondary p-4 rounded-lg items-center"
            >
              <CheckCircle2
                size={40}
                color="#000000"
                fill="rgb(249, 115, 22)"
              />

              <VStack space="xs" className="flex-1">
                <HStack space="xs" className="items-center">
                  <Text size="md" bold className="text-text-headline">
                    {item.day}
                  </Text>
                  <Text size="sm" className="text-text-span">
                    • {item.date}
                  </Text>
                </HStack>

                <HStack space="md" className="items-center">
                  <Text size="sm" className="text-text-body">
                    ⏱️ {item.time}
                  </Text>
                  <Text size="sm" className="text-brand font-bold">
                    💪 {item.xp} XP
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
