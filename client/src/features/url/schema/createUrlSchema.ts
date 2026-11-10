import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .max(2048, "URL is too long (max 2048 characters)")
    .pipe(
      z.url({
        protocol: /^https?$/,
        hostname: /^([a-z0-9-]+\.)+[a-z]{2,}$/i,
        error: "Please provide a valid HTTP or HTTPS URL",
      }),
    ),
});
export type CreateUrlDto = z.infer<typeof urlSchema>;
