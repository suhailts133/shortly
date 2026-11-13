import type { IApiResponse, IApiResponseWithPagination } from '../../../common/interfaces/api-response.interface';
import { MyUrls } from '../dtos/url.dto';

export interface IUrlService {
  generateUrl(ogUrl: string,userId:string): Promise<IApiResponse<string>>;
  redirectUrl(shortId: string): Promise<string>;
  getMyUrls(userId: string,pageNo?:number): Promise<IApiResponseWithPagination<MyUrls[]>>;
}
