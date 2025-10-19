import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/shared/components/ui/alert-dialog';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { Text } from '@/shared/components/ui/text';

interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmAction?: 'default' | 'positive' | 'negative';
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(
  null
);

export function ConfirmDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = useCallback((opts: ConfirmDialogOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    resolver?.(true);
    setIsOpen(false);
    setResolver(null);
  };

  const handleCancel = () => {
    resolver?.(false);
    setIsOpen(false);
    setResolver(null);
  };

  const handleClose = () => {
    resolver?.(false);
    setIsOpen(false);
    setResolver(null);
  };

  const getConfirmButtonAction = () => {
    const action = options?.confirmAction || 'default';
    if (action === 'negative') return 'negative';
    if (action === 'positive') return 'positive';
    return 'primary';
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog isOpen={isOpen} onClose={handleClose}>
        <AlertDialogBackdrop className="bg-black/60" />
        <AlertDialogContent className="bg-background-secondary border-2 border-border-primary rounded-2xl p-6 mx-4">
          <AlertDialogHeader className="mb-3">
            <Text size="xl" bold className="text-text-headline">
              {options?.title}
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mb-6">
            <Text size="md" className="text-text-body leading-6">
              {options?.message}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="flex-row gap-3">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleCancel}
              className="flex-1"
            >
              <ButtonText>{options?.cancelText || 'Cancelar'}</ButtonText>
            </Button>
            <Button
              variant="solid"
              action={getConfirmButtonAction()}
              onPress={handleConfirm}
              className="flex-1"
            >
              <ButtonText>{options?.confirmText || 'Confirmar'}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error(
      'useConfirmDialog must be used within a ConfirmDialogProvider'
    );
  }

  return context.confirm;
}
