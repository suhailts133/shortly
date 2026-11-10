import { useEffect, useMemo } from "react";

export function useImagePreview(files?: FileList | null): string | null {
  const file = files?.[0];
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  return previewUrl;
}
