import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { COLORS } from "@/shared/constants";

interface DotIndicatorProps {
  isActive: boolean;
}

export function DotIndicator({ isActive }: DotIndicatorProps) {
  const widthAnim = useRef(new Animated.Value(isActive ? 32 : 8)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: isActive ? 32 : 8,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.3,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive, widthAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        width: widthAnim,
        height: 8,
        borderRadius: 4,
        backgroundColor: isActive ? COLORS.brand.DEFAULT : COLORS.border.primary,
        opacity: opacityAnim,
      }}
    />
  );
}
