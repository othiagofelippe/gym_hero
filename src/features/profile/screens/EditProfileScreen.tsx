import { useAuth } from "@/features/auth/hooks";
import {
  editProfileSchema,
  type EditProfileFormData,
} from "@/features/profile/schemas/edit-profile.schema";
import { BackButton } from "@/shared/components/BackButton";
import { FormField } from "@/shared/components/form";
import { Button, ButtonText } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";
import { VStack } from "@/shared/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Camera, Target, User } from "lucide-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { SafeAreaWrapper } from "@/shared/components/SafeAreaWrapper";

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [loading] = useState(false);

  const { control, handleSubmit, watch } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.displayName || "",
      age: "",
      goal: "",
    },
  });

  const name = watch("name");

  const onSubmit = async () => {
  };

  const handleChangeAvatar = () => {
    console.log("Change avatar");
  };

  return (
    <SafeAreaWrapper>
      <VStack className="flex-1 bg-background-primary p-6" space="xl">
        <VStack space="md">
          <BackButton />
          <VStack space="xs">
            <Text size="3xl" bold className="text-text-headline">
              Editar Perfil
            </Text>
            <Text size="md" className="text-text-body">
              Atualize suas informações pessoais
            </Text>
          </VStack>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl" className="pb-6">
            <VStack space="lg" className="items-center">
              <View className="w-28 h-28 rounded-full bg-brand/10 border-2 border-brand items-center justify-center">
                <Text size="4xl" bold className="text-brand">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>

              <Button variant="link" onPress={handleChangeAvatar}>
                <Camera size={18} color="rgb(249, 115, 22)" />
                <ButtonText className="text-brand ml-2">
                  Alterar foto
                </ButtonText>
              </Button>
            </VStack>

            <VStack space="lg">
              <FormField
                control={control}
                name="name"
                label="Nome"
                placeholder="Seu nome completo"
                icon={User}
                autoCapitalize="words"
              />

              <FormField
                control={control}
                name="age"
                label="Idade"
                placeholder="Sua idade"
                icon={Calendar}
                keyboardType="number-pad"
              />

              <FormField
                control={control}
                name="goal"
                label="Meta"
                placeholder="Qual seu objetivo?"
                icon={Target}
              />
            </VStack>

            <Button
              onPress={handleSubmit(onSubmit)}
              className="bg-brand mt-4"
              size="xl"
              disabled={loading}
            >
              <ButtonText className="text-white text-lg">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaWrapper>
  );
}
