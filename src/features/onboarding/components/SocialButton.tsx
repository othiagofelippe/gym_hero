import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Mail } from "lucide-react-native";

type IconProvider = 'apple' | 'google' | 'facebook' | 'mail';

interface SocialButtonProps {
  provider: IconProvider;
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}

export function SocialButton({
  provider,
  label,
  onPress,
  backgroundColor = "bg-background-secondary border-2 border-border-primary",
  textColor = "text-text-heading",
  iconColor = "#000000",
}: SocialButtonProps) {
  const renderIcon = () => {
    switch (provider) {
      case 'apple':
        return <FontAwesome name="apple" size={20} color={iconColor} />;
      case 'google':
        return <AntDesign name="google" size={20} color={iconColor} />;
      case 'facebook':
        return <FontAwesome name="facebook" size={20} color={iconColor} />;
      case 'mail':
        return <Mail size={20} color={iconColor} />;
    }
  };

  return (
    <Button
      onPress={onPress}
      className={`${backgroundColor} border-0`}
      size="xl"
    >
      <HStack space="sm" className="items-center">
        {renderIcon()}
        <ButtonText className={`${textColor} text-base font-semibold`}>
          {label}
        </ButtonText>
      </HStack>
    </Button>
  );
}
