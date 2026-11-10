import { isApiError, UNKNOWN_ERROR } from "../../../api/responseType";
import { useGenerateUrlMutation } from "./urlSlice";

export const useUrlService = () => {
  const [generateUrlMutation, {isLoading}] = useGenerateUrlMutation();

  const generateUrl = async (url: string) => {
    try {
      return await generateUrlMutation(url).unwrap();
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  return {
    isLoading,
    generateUrl,
  };
};
