import { z } from "zod";
import { emailField, passwordField } from "../../../common/dtos/fields";

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginRequestDTO = z.infer<typeof loginSchema>;
