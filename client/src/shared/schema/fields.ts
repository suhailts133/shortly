import { z } from "zod";

export const emailField = z.email("Invalid email address").trim().toLowerCase();
export const textField = (exptyMessage: string, Minmessage: string, maxMessage: string, minChar: number, maxChar: number) =>
  z.string(exptyMessage).trim().min(minChar, Minmessage).max(maxChar, maxMessage);

export const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");
