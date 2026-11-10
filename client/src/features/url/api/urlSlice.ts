import { API_ROUTES } from "../../../api/apiRoutes";
import { baseApi } from "../../../api/baseApi";
import type { IApiResponse,  } from "../../../api/responseType";

export const UrlSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    generateUrl: builder.mutation<IApiResponse<string>, string>({
      query: (url:string) => ({
        url: API_ROUTES.URL.CREATE,
        method: "POST",
        body:{url},
      }),
    
    }),

  
  }),
});

export const {  useGenerateUrlMutation  } = UrlSlice;
