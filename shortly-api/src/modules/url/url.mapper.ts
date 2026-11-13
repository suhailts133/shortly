import type { HydratedDocument } from 'mongoose';
import { Url } from './url.schema';
import { MyUrls } from './dtos/url.dto';

export class UrlMapper {
  static toDtoList(data: HydratedDocument<Url>[]): MyUrls[] {
    return data.map(d => ({
      date: d.createdAt.toLocaleDateString(),
      url: d.shortUrl,
      originalUrl:d.originalUrl
    }));
  }
}