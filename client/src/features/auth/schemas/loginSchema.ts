import { z } from "zod";
import { emailField, passwordField } from "../../../shared/schema/fields";

export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginFormType = z.infer<typeof LoginSchema>;
