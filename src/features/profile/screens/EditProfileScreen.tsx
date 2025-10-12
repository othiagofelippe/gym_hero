import { VStack } from '@/shared/components/ui/vstack';
import { Text } from '@/shared/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/shared/components/ui/input';
import { Button, ButtonText } from '@/shared/components/ui/button';
import { router } from 'expo-router';
import { View } from 'react-native';
import { User, Calendar, Target } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema, type EditProfileFormData } from '@/features/profile/schemas/edit-profile.schema';

export default function EditProfileScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: 'João Silva',
      age: '25',
      goal: 'Ganhar massa muscular',
    },
  });

  const name = watch('name');

  const onSubmit = (data: EditProfileFormData) => {
    console.log('Save profile:', data);
    // Aqui salvaria os dados
    router.back();
  };

  const handleChangeAvatar = () => {
    console.log('Change avatar');
    // Aqui abriria o seletor de imagem
  };

  return (
    <VStack className="flex-1 p-6" space="xl">
      {/* Header com botão voltar */}
      <VStack space="md" className="pt-4">
        <Button variant="link" onPress={() => router.back()} className="self-start">
          <ButtonText>← Voltar</ButtonText>
        </Button>

        <Text size="2xl" bold>
          Editar Perfil
        </Text>
      </VStack>

      {/* Avatar */}
      <VStack space="md" className="items-center">
        <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center">
          <Text size="3xl" bold>
            {name?.charAt(0) || 'J'}
          </Text>
        </View>
        <Button variant="link" onPress={handleChangeAvatar} size="sm">
          <ButtonText>Alterar foto</ButtonText>
        </Button>
      </VStack>

      {/* Formulário */}
      <VStack space="lg">
        <VStack space="sm">
          <Text size="sm" bold>
            Nome
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input className={errors.name ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={User} />
                </InputSlot>
                <InputField
                  placeholder="Seu nome completo"
                  {...field}
                  onChangeText={field.onChange}
                  autoCapitalize="words"
                />
              </Input>
            )}
          />
          {errors.name && (
            <Text size="xs" className="text-red-500">
              {errors.name.message}
            </Text>
          )}
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Idade
          </Text>
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <Input className={errors.age ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={Calendar} />
                </InputSlot>
                <InputField
                  placeholder="Sua idade"
                  {...field}
                  onChangeText={field.onChange}
                  keyboardType="number-pad"
                />
              </Input>
            )}
          />
          {errors.age && (
            <Text size="xs" className="text-red-500">
              {errors.age.message}
            </Text>
          )}
        </VStack>

        <VStack space="sm">
          <Text size="sm" bold>
            Meta
          </Text>
          <Controller
            control={control}
            name="goal"
            render={({ field }) => (
              <Input className={errors.goal ? 'border-red-500' : ''}>
                <InputSlot className="pl-3">
                  <InputIcon as={Target} />
                </InputSlot>
                <InputField
                  placeholder="Qual seu objetivo?"
                  {...field}
                  onChangeText={field.onChange}
                />
              </Input>
            )}
          />
          {errors.goal && (
            <Text size="xs" className="text-red-500">
              {errors.goal.message}
            </Text>
          )}
        </VStack>

        <Button onPress={handleSubmit(onSubmit)} className="mt-4">
          <ButtonText>Salvar Alterações</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
