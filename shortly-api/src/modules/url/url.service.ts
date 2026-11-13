import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import type { IApiResponse, IApiResponseWithPagination } from '../../common/interfaces/api-response.interface';
import type { Env } from '../../config/env.config';
import { URL_REPO, type IUrlRepo } from './interfaces/url-repo.interface';
import type { IUrlService } from './interfaces/url-service.interface';
import { URL_MESSAGES } from './messages/url.messages';
import { toObjectId } from '../../common/utils/to-object-id';
import { MyUrls } from './dtos/url.dto';
import { UrlMapper } from './url.mapper';

@Injectable()
export class UrlService implements IUrlService {
  constructor(
    @Inject(URL_REPO) private readonly _urlRepo: IUrlRepo,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async generateUrl(ogUrl: string, userId: string): Promise<IApiResponse<string>> {
    const existing = await this._urlRepo.findByUrl(ogUrl);
    if (existing) {
      return {
        message: URL_MESSAGES.ALREADY_EXISTS,
        data: existing.shortUrl,
        isExisting: true,
      };
    }

    const shortId = nanoid(8);
    const shortUrl = `${this.config.get('BASE', { infer: true })}/${shortId}`;
    const created = await this._urlRepo.create({
      shortId,
      originalUrl: ogUrl,
      shortUrl,
      userId: toObjectId(userId),
    });
    return { message: URL_MESSAGES.CREATED, data: created.shortUrl };
  }

  async redirectUrl(shortId: string): Promise<string> {
    const url = await this._urlRepo.findOne({ shortId });
    if (!url) throw new NotFoundException(URL_MESSAGES.NOT_FOUND);
    return url.originalUrl;
  }

  async getMyUrls(userId: string, pageNo?:number): Promise<IApiResponseWithPagination<MyUrls[]>> {
    const { data, pagination } = await this._urlRepo.getMyUrls(userId,pageNo);
    const urlData = UrlMapper.toDtoList(data);
    return {
      message: URL_MESSAGES.ALL_URLS,
      data: urlData,
      total: pagination.total,
      totalPages: pagination.totalPages,
    };
  }
}
