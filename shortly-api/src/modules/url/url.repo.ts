import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { HydratedDocument, Model } from 'mongoose';
import { BaseRepository } from '../../common/repo/base.repo';
import type { IUrlRepo } from './interfaces/url-repo.interface';
import { Url } from './url.schema';

@Injectable()
export class UrlRepo extends BaseRepository<Url> implements IUrlRepo {
  constructor(@InjectModel(Url.name) model: Model<Url>) {
    super(model);
  }

  findByUrl(url: string): Promise<HydratedDocument<Url> | null> {
    return this.findOne({ originalUrl: url });
  }
}