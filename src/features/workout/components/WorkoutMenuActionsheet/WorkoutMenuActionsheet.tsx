import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/shared/components/ui/actionsheet";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { Copy, Edit2, Trash2 } from "lucide-react-native";
import type { WorkoutMenuActionsheetProps } from "./WorkoutMenuActionsheet.types";

export function WorkoutMenuActionsheet({
  isOpen,
  onClose,
  onEdit,
  onDuplicate,
  onDelete,
}: WorkoutMenuActionsheetProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="bg-background-primary">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className="bg-border-primary" />
        </ActionsheetDragIndicatorWrapper>

        <VStack className="w-full p-4" space="sm">
          <Text size="lg" bold className="text-text-headline px-2 pb-2">
            Opções do Treino
          </Text>

          <ActionsheetItem onPress={onEdit} className="py-4">
            <HStack space="md" className="items-center">
              <Edit2 size={20} color="rgb(249, 115, 22)" />
              <ActionsheetItemText className="text-text-headline text-base">
                Editar Treino
              </ActionsheetItemText>
            </HStack>
          </ActionsheetItem>

          <ActionsheetItem onPress={onDuplicate} className="py-4">
            <HStack space="md" className="items-center">
              <Copy size={20} color="rgb(249, 115, 22)" />
              <ActionsheetItemText className="text-text-headline text-base">
                Duplicar Treino
              </ActionsheetItemText>
            </HStack>
          </ActionsheetItem>

          <ActionsheetItem onPress={onDelete} className="py-4">
            <HStack space="md" className="items-center">
              <Trash2 size={20} color="rgb(239, 68, 68)" />
              <ActionsheetItemText className="text-red-500 text-base">
                Deletar Treino
              </ActionsheetItemText>
            </HStack>
          </ActionsheetItem>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
