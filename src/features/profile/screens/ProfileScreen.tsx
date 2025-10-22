import { useAuth } from "@/features/auth/hooks/useAuth";
import { logoutUser } from "@/features/auth/services/authService";
import { Avatar, AvatarFallbackText } from "@/shared/components/ui/avatar";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { HStack } from "@/shared/components/ui/hstack";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { useConfirmDialog } from "@/shared/hooks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAuth();
  const confirm = useConfirmDialog();

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Sair da conta",
      message: "Tem certeza que deseja sair do Gym Hero?",
      confirmText: "Sair",
      cancelText: "Cancelar",
      confirmAction: "negative",
    });

    if (confirmed) {
      const { error } = await logoutUser();
      if (error) {
        // TODO: Substituir por Toast no futuro
        console.error("Erro ao sair:", error.message);
        return;
      }
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
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <VStack className="flex-1 bg-background-primary p-6" space="xl">
        <VStack space="xs">
          <Text size="3xl" bold className="text-text-headline">
            Perfil
          </Text>
          <Text size="md" className="text-text-body">
            Gerencie sua conta e preferências
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl" className="pb-6">
            <VStack space="lg" className="items-center">
              <Avatar size="2xl" className="bg-brand/10 border-2 border-brand">
                <AvatarFallbackText className="text-brand">
                  {userInitial}
                </AvatarFallbackText>
              </Avatar>

              <VStack space="xs" className="items-center">
                <Text size="2xl" bold className="text-text-headline">
                  {userName}
                </Text>
                <Text size="md" className="text-text-body">
                  {userEmail}
                </Text>
              </VStack>
            </VStack>

            <VStack space="md">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(tabs)/(profile)/edit-profile")}
              >
                <HStack className="items-center justify-between p-4 rounded-xl bg-background-secondary border border-border-primary">
                  <Text size="md" bold className="text-text-headline">
                    Editar Perfil
                  </Text>
                  <ChevronRight size={20} color="rgb(161, 161, 170)" />
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(tabs)/(profile)/preferences")}
              >
                <HStack className="items-center justify-between p-4 rounded-xl bg-background-secondary border border-border-primary">
                  <VStack space="xs">
                    <Text size="md" bold className="text-text-headline">
                      Preferências
                    </Text>
                    <Text size="sm" className="text-text-span">
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
              className="border-border-primary mt-4"
              size="xl"
            >
              <ButtonText className="text-text-headline text-lg">
                Sair da Conta
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
