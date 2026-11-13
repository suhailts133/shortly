import type { HydratedDocument } from 'mongoose';
import type { IBaseRepository } from '../../../common/interfaces/base-repo.interface';
import type { Url } from '../url.schema';
import { Pagination } from '../../../common/dtos/pagination';

export const URL_REPO = Symbol('URL_REPO');

export interface IUrlRepo extends IBaseRepository<Url> {
  findByUrl(url: string): Promise<HydratedDocument<Url> | null>;
  getMyUrls(
    userId: string,
    pageNo?: number,
  ): Promise<{ data: HydratedDocument<Url>[]; pagination: Pagination }>;
}
