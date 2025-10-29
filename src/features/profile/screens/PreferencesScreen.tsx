import { useState } from "react";
import { ScrollView, Switch } from "react-native";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

import { BackButton } from "@/shared/components/BackButton";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/shared/components/ui/actionsheet";
import { Check } from "lucide-react-native";
import { useColorScheme } from "nativewind";

export default function PreferencesScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [language, setLanguage] = useState<"pt-BR" | "es" | "en">("pt-BR");
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);

  const LANGUAGE_OPTIONS = [
    { value: "pt-BR" as const, label: "Português (Brasil)" },
    { value: "es" as const, label: "Español" },
    { value: "en" as const, label: "English" },
  ];

  const currentLanguageLabel =
    LANGUAGE_OPTIONS.find((option) => option.value === language)?.label ?? "Português (Brasil)";

  return (
    <SafeAreaWrapper>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary">
        <VStack className="p-6" space="md">
          <BackButton />

          <VStack space="xs">
            <Text size="3xl" bold className="text-text-headline dark:text-dark-text-headline">
              Preferências
            </Text>
            <Text size="sm" className="text-text-body dark:text-dark-text-body">
              Personalize sua experiência no Gym Hero
            </Text>
          </VStack>
        </VStack>

        <ScrollView className="flex-1 px-6">
          <VStack space="xl" className="pb-6">
            <VStack space="md">
              <Text
                size="sm"
                bold
                className="text-text-span dark:text-dark-text-span uppercase"
              >
                Aparência
              </Text>

              <VStack
                space="sm"
                className="p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary"
              >
                <HStack className="justify-between items-center">
                  <VStack space="xs">
                    <Text
                      size="md"
                      bold
                      className="text-text-headline dark:text-dark-text-headline"
                    >
                      Modo Escuro
                    </Text>
                    <Text size="sm" className="text-text-span dark:text-dark-text-span">
                      Ajuste o tema da interface
                    </Text>
                  </VStack>
                  <Switch
                    value={isDarkMode}
                    onValueChange={(value) =>
                      setColorScheme(value ? "dark" : "light")
                    }
                    trackColor={{ false: "#3f3f46", true: "rgb(249, 115, 22)" }}
                    thumbColor={isDarkMode ? "#fff" : "#f4f4f5"}
                  />
                </HStack>
              </VStack>
            </VStack>

            <VStack space="md">
              <Text
                size="sm"
                bold
                className="text-text-span dark:text-dark-text-span uppercase"
              >
                Notificações
              </Text>

              <VStack
                space="sm"
                className="p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary"
              >
                <HStack className="justify-between items-center">
                  <VStack space="xs">
                    <Text
                      size="md"
                      bold
                      className="text-text-headline dark:text-dark-text-headline"
                    >
                      Push notifications
                    </Text>
                    <Text size="sm" className="text-text-span dark:text-dark-text-span">
                      Avisos sobre treinos, metas e desafios
                    </Text>
                  </VStack>
                  <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                    trackColor={{ false: "#3f3f46", true: "rgb(249, 115, 22)" }}
                    thumbColor={pushNotifications ? "#fff" : "#f4f4f5"}
                  />
                </HStack>
              </VStack>

              <VStack
                space="sm"
                className="p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary"
              >
                <HStack className="justify-between items-center">
                  <VStack space="xs">
                    <Text
                      size="md"
                      bold
                      className="text-text-headline dark:text-dark-text-headline"
                    >
                      Emails semanais
                    </Text>
                    <Text size="sm" className="text-text-span dark:text-dark-text-span">
                      Resumo de progresso e sugestões de treino
                    </Text>
                  </VStack>
                  <Switch
                    value={emailUpdates}
                    onValueChange={setEmailUpdates}
                    trackColor={{ false: "#3f3f46", true: "rgb(249, 115, 22)" }}
                    thumbColor={emailUpdates ? "#fff" : "#f4f4f5"}
                  />
                </HStack>
              </VStack>
            </VStack>

            <VStack space="md">
              <Text
                size="sm"
                bold
                className="text-text-span dark:text-dark-text-span uppercase"
              >
                Idioma e região
              </Text>

              <VStack
                space="sm"
                className="p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary"
              >
                <VStack space="xs">
                  <Text
                    size="md"
                    bold
                    className="text-text-headline dark:text-dark-text-headline"
                  >
                    Idioma do aplicativo
                  </Text>
                  <Text size="sm" className="text-text-span dark:text-dark-text-span">
                    {currentLanguageLabel}
                  </Text>
                </VStack>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-border-primary dark:border-dark-border-primary"
                  onPress={() => setShowLanguageSheet(true)}
                >
                  <ButtonText className="text-text-headline dark:text-dark-text-headline text-base">
                    Alterar idioma
                  </ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>

      <Actionsheet isOpen={showLanguageSheet} onClose={() => setShowLanguageSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="bg-background-primary dark:bg-dark-background-primary">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator className="bg-border-primary dark:bg-dark-border-primary" />
          </ActionsheetDragIndicatorWrapper>

          <VStack className="w-full p-6" space="lg">
            <VStack space="xs">
              <Text
                size="2xl"
                bold
                className="text-text-headline dark:text-dark-text-headline"
              >
                Selecionar idioma
              </Text>
              <Text size="sm" className="text-text-span dark:text-dark-text-span">
                Escolha o idioma padrão do aplicativo
              </Text>
            </VStack>

            <VStack space="sm">
              {LANGUAGE_OPTIONS.map((option) => {
                const isSelected = option.value === language;
                return (
                  <ActionsheetItem
                    key={option.value}
                    onPress={() => {
                      setLanguage(option.value);
                      setShowLanguageSheet(false);
                    }}
                    className="px-3 py-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary"
                  >
                    <HStack className="items-center justify-between">
                      <ActionsheetItemText className="text-text-headline dark:text-dark-text-headline text-base">
                        {option.label}
                      </ActionsheetItemText>
                      {isSelected && (
                        <Check size={18} color="rgb(249, 115, 22)" strokeWidth={3} />
                      )}
                    </HStack>
                  </ActionsheetItem>
                );
              })}
            </VStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaWrapper>
  );
}
