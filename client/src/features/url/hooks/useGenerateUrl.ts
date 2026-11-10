import {  useUrlService } from "../api/urlService";

export const useGenerateUrl = () => {
  const { generateUrl, isLoading } = useUrlService();
  const handleUrlGeneration = async (url: string) => await generateUrl(url);

  return {
    handleUrlGeneration,
    isLoading,
  };
};
