import type { Control, FieldValues, Path } from "react-hook-form";
import type { TextInputProps } from "react-native";
import type { LucideIcon } from "lucide-react-native";

export interface FormFieldProps<T extends FieldValues> extends Omit<TextInputProps, "onChange" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  icon?: LucideIcon;
}
