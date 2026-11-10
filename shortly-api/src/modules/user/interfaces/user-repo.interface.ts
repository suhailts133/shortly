import type { HydratedDocument } from 'mongoose';
import type { IBaseRepository } from '../../../common/interfaces/base-repo.interface';
import type { User } from '../user.schema';

export const USER_REPO = Symbol('USER_REPO');

export interface IUserRepo extends IBaseRepository<User> {
  findByEmail(email: string): Promise<HydratedDocument<User> | null>;
}