import type { IApiResponse } from '../../../common/interfaces/api-response.interface';

export interface IUrlService {
  generateUrl(ogUrl: string): Promise<IApiResponse<string>>;
  redirectUrl(shortId: string): Promise<string>;
}