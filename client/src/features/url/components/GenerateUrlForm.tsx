import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../../shared/components/form/InputField";
import SubmitButton from "../../../shared/components/form/SubmitButton";
import { useHandleResponse } from "../../../shared/hooks/useHandleResponse";
import { useGenerateUrl } from "../hooks/useGenerateUrl";
import { urlSchema, type CreateUrlDto } from "../schema/createUrlSchema";

interface GenerateUrlFormProps {
  onGenerated: (url: string) => void;
}

export default function GenerateUrlForm({ onGenerated }: GenerateUrlFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlDto>({
    resolver: zodResolver(urlSchema),
    mode: "onBlur",
  });

  const { isLoading, handleUrlGeneration } = useGenerateUrl();
  const handleResponse = useHandleResponse();

  const onSubmit = async ({ url }: CreateUrlDto) => {
    const result = await handleUrlGeneration(url);
    handleResponse(result.success, "URL generated successfully", result.message);

    const generated = result.data;
    if (result.success && generated) {
      onGenerated(generated);
      reset();
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Your URL"
        type="text"
        placeholder="https://example.com/a/very/long/link"
        registration={register("url")}
        error={errors.url?.message}
      />

      <SubmitButton
        isLoading={isLoading}
        label="Generate"
        loadingLabel="Generating"
        type="submit"
      />
    </form>
  );
}