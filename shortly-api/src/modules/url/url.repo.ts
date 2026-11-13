import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { HydratedDocument, Model } from 'mongoose';
import { BaseRepository } from '../../common/repo/base.repo';
import type { IUrlRepo } from './interfaces/url-repo.interface';
import { Url } from './url.schema';
import { Pagination } from '../../common/dtos/pagination';

@Injectable()
export class UrlRepo extends BaseRepository<Url> implements IUrlRepo {
  constructor(@InjectModel(Url.name) model: Model<Url>) {
    super(model);
  }

  async findByUrl(url: string): Promise<HydratedDocument<Url> | null> {
    return await this.findOne({ originalUrl: url });
  }

  async getMyUrls(userId: string, pageNo?: number): Promise<{ data: HydratedDocument<Url>[]; pagination: Pagination }> {
    const page = pageNo || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const [result, total] = await Promise.all([
      this.find({ userId }, { limit, skip, sort: { createdAt: -1 } }),
      this.countDocuments({ userId }),
    ]);
    const pagination: Pagination = {
      total,
      totalPages: Math.ceil(total / limit),
    };
    return { data: result, pagination };
  }
}
