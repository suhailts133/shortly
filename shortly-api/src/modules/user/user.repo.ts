import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { HydratedDocument, Model } from 'mongoose';
import { BaseRepository } from '../../common/repo/base.repo';
import type { IUserRepo } from './interfaces/user-repo.interface';
import { User } from './user.schema';

@Injectable()
export class UserRepo extends BaseRepository<User> implements IUserRepo {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model);
  }

  findByEmail(email: string): Promise<HydratedDocument<User> | null> {
    return this.findOne({ email });
  }
}