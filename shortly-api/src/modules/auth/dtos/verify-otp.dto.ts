import { z } from "zod";
import { emailField } from "../../../common/dtos/fields";

export const verifyOtpSchema = z.object({
  email: emailField,
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export type VerifyOtpRequestDTO = z.infer<typeof verifyOtpSchema>;
