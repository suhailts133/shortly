import type { HydratedDocument } from 'mongoose';
import type { IBaseRepository } from '../../../common/interfaces/base-repo.interface';
import type { Url } from '../url.schema';

export const URL_REPO = Symbol('URL_REPO');

export interface IUrlRepo extends IBaseRepository<Url> {
  findByUrl(url: string): Promise<HydratedDocument<Url> | null>;
}