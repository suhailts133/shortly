import { z } from 'zod';
import { emailField } from '../../../common/dtos/fields';

export const resendOtpSchema = z.object({ email: emailField });
export type ResendOtpRequestDTO = z.infer<typeof resendOtpSchema>;