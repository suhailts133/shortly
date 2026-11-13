import { API_ROUTES } from "../../../api/apiRoutes";
import { baseApi } from "../../../api/baseApi";
import type { IApiResponse, IApiResponseWithPagination,  } from "../../../api/responseType";
import type { MyUrls } from "../type/url.interface";

export const UrlSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    generateUrl: builder.mutation<IApiResponse<string>, string>({
      query: (url:string) => ({
        url: API_ROUTES.URL.CREATE,
        method: "POST",
        body:{url},
      }),
      invalidatesTags:['url']
    
    }),
    getMyUrls:builder.query<IApiResponseWithPagination<MyUrls[]>,number>({
      query:(page:number) => ({
        url:API_ROUTES.URL.MY_URLS,
        method:"GET",
        params:{page}
      }),
      providesTags:["url"]
      
    })

  
  }),
});

export const {  useGenerateUrlMutation ,useGetMyUrlsQuery } = UrlSlice;
