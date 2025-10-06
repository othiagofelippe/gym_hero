import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
