import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }).min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
