import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { LucideIcon } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

interface LoadingStateProps {
  icon: LucideIcon;
  message?: string;
  iconSize?: number;
}

export function LoadingState({
  icon: Icon,
  message = "Carregando...",
  iconSize = 60,
}: LoadingStateProps) {
  return (
    <VStack className="flex-1 items-center justify-center py-12" space="lg">
      <View className="p-6 rounded-2xl bg-background-secondary border-2 border-border-primary">
        <Icon size={iconSize} color="rgb(249, 115, 22)" />
      </View>
      <VStack space="sm" className="items-center">
        <ActivityIndicator size="large" color="rgb(249, 115, 22)" />
        <Text size="lg" className="text-text-body">
          {message}
        </Text>
      </VStack>
    </VStack>
  );
}
