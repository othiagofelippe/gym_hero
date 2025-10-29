import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks";
import { Avatar, AvatarFallbackText } from "@/shared/components/ui/avatar";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { useConfirmDialog } from "@/shared/hooks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const confirm = useConfirmDialog();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Sair da conta",
      message: "Tem certeza que deseja sair do Gym Hero?",
      confirmText: "Sair",
      cancelText: "Cancelar",
      confirmAction: "negative",
    });

    if (confirmed) {
      await logoutMutation.mutateAsync();
      router.replace("/(onboarding)/welcome");
    }
  };

  if (!user) {
    return null;
  }

  const userName = user.displayName || "Usuário";
  const userEmail = user.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <SafeAreaWrapper>
      <VStack className="flex-1 bg-background-primary dark:bg-dark-background-primary p-6" space="xl">
        <VStack space="xs">
          <Text size="3xl" bold className="text-text-headline dark:text-dark-text-headline">
            Perfil
          </Text>
          <Text size="md" className="text-text-body dark:text-dark-text-body">
            Gerencie sua conta e preferências
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl" className="pb-6">
            <VStack space="lg" className="items-center">
              <Avatar size="2xl" className="bg-accent-brand/10 border-2 border-accent-brand">
                <AvatarFallbackText className="text-accent-brand">
                  {userInitial}
                </AvatarFallbackText>
              </Avatar>

              <VStack space="xs" className="items-center">
                <Text size="2xl" bold className="text-text-headline dark:text-dark-text-headline">
                  {userName}
                </Text>
                <Text size="md" className="text-text-body dark:text-dark-text-body">
                  {userEmail}
                </Text>
              </VStack>
            </VStack>

            <VStack space="md">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(tabs)/(profile)/edit-profile")}
              >
                <HStack className="items-center justify-between p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary">
                  <Text size="md" bold className="text-text-headline dark:text-dark-text-headline">
                    Editar Perfil
                  </Text>
                  <ChevronRight size={20} color="rgb(161, 161, 170)" />
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(tabs)/(profile)/preferences")}
              >
                <HStack className="items-center justify-between p-4 rounded-xl bg-background-secondary dark:bg-dark-background-secondary border border-border-primary dark:border-dark-border-primary">
                  <VStack space="xs">
                    <Text size="md" bold className="text-text-headline dark:text-dark-text-headline">
                      Preferências
                    </Text>
                    <Text size="sm" className="text-text-span dark:text-dark-text-span">
                      Tema, notificações e idioma
                    </Text>
                  </VStack>
                  <ChevronRight size={20} color="rgb(161, 161, 170)" />
                </HStack>
              </TouchableOpacity>
            </VStack>

            <Button
              variant="outline"
              onPress={handleLogout}
              className="border-border-primary dark:border-dark-border-primary mt-4"
              size="xl"
            >
              <ButtonText className="text-text-headline dark:text-dark-text-headline text-lg">
                Sair da Conta
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaWrapper>
  );
}
