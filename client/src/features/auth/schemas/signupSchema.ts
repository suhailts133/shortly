import { z } from "zod";
import { emailField, passwordField, textField } from "../../../shared/schema/fields";

export const signupSchema = z
  .object({
    email: emailField,
    name: textField("name is required", "name must be at least 3 characters", "name must be under 50 characters", 3, 50),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupSchema>;
