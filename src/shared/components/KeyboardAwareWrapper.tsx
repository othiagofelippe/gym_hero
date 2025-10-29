import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import type { ReactNode } from 'react';

interface KeyboardAwareWrapperProps {
  children: ReactNode;
  bottomOffset?: number;
}

export function KeyboardAwareWrapper({
  children,
  bottomOffset = 20
}: KeyboardAwareWrapperProps) {
  return (
    <KeyboardAwareScrollView
      bottomOffset={bottomOffset}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
