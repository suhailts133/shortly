import { z } from "zod";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const imageField = (fieldName: string, isOptional = false) =>
  z.instanceof(FileList, { error: `${fieldName} is required` }).superRefine((files, ctx) => {
    const file = files[0];

    if (!file) {
      if (!isOptional) {
        ctx.addIssue({ code: "custom", message: `${fieldName} is required` });
      }
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: "custom",
        message: `${fieldName} must be a valid image (jpeg, png, webp)`,
      });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      ctx.addIssue({
        code: "custom",
        message: `${fieldName} must be smaller than 5MB`,
      });
    }
  });
