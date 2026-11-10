import type { HydratedDocument, Model, QueryFilter, QueryOptions, UpdateQuery } from 'mongoose';
import type { IBaseRepository } from '../interfaces/base-repo.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly _model: Model<T>) {}

  async countDocuments(filter: QueryFilter<T>): Promise<number> {
    return this._model.countDocuments(filter).exec();
  }

  async create(item: Partial<T>): Promise<HydratedDocument<T>> {
    return this._model.create(item);
  }

  async update(id: string, item: UpdateQuery<T>): Promise<HydratedDocument<T> | null> {
    return this._model.findByIdAndUpdate(id, item, { returnDocument: 'after' }).exec();
  }

  async updateOne(filter: QueryFilter<T>, item: UpdateQuery<T>): Promise<HydratedDocument<T> | null> {
    return this._model.findOneAndUpdate(filter, item, { returnDocument: 'after' }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async find(filter: QueryFilter<T>, options?: QueryOptions): Promise<HydratedDocument<T>[]> {
    return this._model.find(filter, null, { ...options }).exec();
  }

  async findOne(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
    return this._model.findOne(filter).exec();
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return this._model.findById(id).exec();
  }
}