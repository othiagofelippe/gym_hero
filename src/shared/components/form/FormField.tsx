import { Input, InputField, InputIcon, InputSlot } from "@/shared/components/ui/input";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./FormField.types";

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  secureTextEntry = false,
  ...inputProps
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <VStack space="sm">
          <Text size="sm" bold className="text-text-heading">
            {label}
          </Text>
          <Input
            className={
              error
                ? "border-red"
                : "border-border-primary bg-background-secondary"
            }
          >
            {icon && (
              <InputSlot className="pl-3">
                <InputIcon as={icon} className="text-text-span" />
              </InputSlot>
            )}
            <InputField
              placeholder={placeholder}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              secureTextEntry={secureTextEntry && !showPassword}
              className="text-text-body"
              {...inputProps}
            />
            {secureTextEntry && (
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon
                  as={showPassword ? Eye : EyeOff}
                  className="text-text-span"
                />
              </InputSlot>
            )}
          </Input>
          {error && (
            <Text size="xs" className="text-red">
              {error.message}
            </Text>
          )}
        </VStack>
      )}
    />
  );
}
