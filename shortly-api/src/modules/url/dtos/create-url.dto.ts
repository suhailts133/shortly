import { z } from 'zod';

export const urlSchema = z.object({
  url: z.url({
    protocol: /^https?$/,
    error: 'Please provide a valid HTTP or HTTPS URL',
  }),
});
export type CreateUrlDto = z.infer<typeof urlSchema>;