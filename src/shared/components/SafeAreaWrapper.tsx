import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets, Edge } from "react-native-safe-area-context";

interface SafeAreaWrapperProps {
  children: ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
  className?: string;
  flex?: boolean;
}

export function SafeAreaWrapper({
  children,
  edges = ["bottom"],
  style,
  className,
  flex = true,
}: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();

  const safeAreaStyle: ViewStyle = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  };

  return (
    <View
      style={[flex && { flex: 1 }, safeAreaStyle, style]}
      className={className}
    >
      {children}
    </View>
  );
}
