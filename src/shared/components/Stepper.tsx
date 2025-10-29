import { Button } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { HStack } from "@/shared/components/ui/hstack";
import { Minus, Plus } from "lucide-react-native";
import { useColorScheme } from "nativewind";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  suffix = "",
}: StepperProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const disabledColor = isDark ? "#7C7C8A" : "rgb(124, 124, 138)";
  const activeColor = "#F97316";

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  return (
    <HStack className="items-center gap-3">
      <Button
        onPress={handleDecrement}
        disabled={value <= min}
        size="sm"
        variant="outline"
        className="w-10 h-10 rounded-lg border-border-primary dark:border-dark-border-primary"
      >
        <Minus size={16} color={value <= min ? disabledColor : activeColor} />
      </Button>

      <Text
        size="xl"
        bold
        className="text-text-headline dark:text-dark-text-headline min-w-[60px] text-center"
      >
        {value}{suffix}
      </Text>

      <Button
        onPress={handleIncrement}
        disabled={value >= max}
        size="sm"
        variant="outline"
        className="w-10 h-10 rounded-lg border-border-primary dark:border-dark-border-primary"
      >
        <Plus size={16} color={value >= max ? disabledColor : activeColor} />
      </Button>
    </HStack>
  );
}
