import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  loginUser,
  registerUser,
  resetPassword,
  updatePassword,
  resendVerificationEmail,
  logoutUser,
} from '@/features/auth/services/authService';
import { useToast } from '@/shared/hooks';

export const useLogin = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      if (data.error) {
        toast.error('Erro ao fazer login', data.error.message);
        return;
      }

      if (data.user) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};

export const useRegister = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => registerUser(email, password, name),
    onSuccess: (data) => {
      if (data.error) {
        toast.error('Erro ao criar conta', data.error.message);
        return;
      }
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};

export const useResetPassword = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ email }: { email: string }) => resetPassword(email),
    onSuccess: (data, variables) => {
      if (data.error) {
        toast.error('Erro ao enviar email', data.error.message);
        return;
      }

      toast.success(
        'Email enviado!',
        `Enviamos as instruções de recuperação para ${variables.email}. Verifique sua caixa de entrada.`
      );
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};

export const useUpdatePassword = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newPassword }: { newPassword: string }) =>
      updatePassword(newPassword),
    onSuccess: (data) => {
      if (data.error) {
        toast.error('Erro ao atualizar senha', data.error.message);
        return;
      }

      if (data.user) {
        toast.success('Senha atualizada!', 'Faça login com sua nova senha');
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};

export const useResendVerificationEmail = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      resendVerificationEmail(email),
    onSuccess: (data) => {
      if (data.error) {
        toast.error('Erro ao reenviar email', data.error.message);
        return;
      }

      toast.success('Email reenviado!', 'Verifique sua caixa de entrada');
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};

export const useLogout = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      if (data.error) {
        toast.error('Erro ao sair', data.error.message);
        return;
      }

      queryClient.clear();
      toast.success('Até logo!', 'Você saiu da sua conta');
    },
    onError: () => {
      toast.error('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    },
  });
};
