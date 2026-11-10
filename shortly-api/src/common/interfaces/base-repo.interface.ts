import type { HydratedDocument, QueryFilter, QueryOptions, UpdateQuery } from 'mongoose';

export interface IBaseRepository<T> {
  create(item: Partial<T>): Promise<HydratedDocument<T>>;
  update(id: string, item: UpdateQuery<T>): Promise<HydratedDocument<T> | null>;
  updateOne(filter: QueryFilter<T>, item: UpdateQuery<T>): Promise<HydratedDocument<T> | null>;
  delete(id: string): Promise<boolean>;
  find(filter: QueryFilter<T>, options?: QueryOptions): Promise<HydratedDocument<T>[]>;
  findOne(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null>;
  findById(id: string): Promise<HydratedDocument<T> | null>;
  countDocuments(filter: QueryFilter<T>): Promise<number>;
}