import { z } from "zod";
import { emailField, passwordField } from "../../../common/dtos/fields";

export const createUserSchema = z
  .object({
    email: emailField,
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateUserRequestDTO = z.infer<typeof createUserSchema>;
