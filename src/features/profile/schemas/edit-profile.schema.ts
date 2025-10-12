import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  age: z.string().min(1, 'Idade é obrigatória').regex(/^\d+$/, 'Idade deve ser um número'),
  goal: z.string().min(3, 'Meta deve ter no mínimo 3 caracteres'),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
