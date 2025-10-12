import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Email inválido" }).min(1, "Email é obrigatório"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
