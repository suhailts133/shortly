import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import type { IApiResponse } from '../../common/interfaces/api-response.interface';
import type { Env } from '../../config/env.config';
import { URL_REPO, type IUrlRepo } from './interfaces/url-repo.interface';
import type { IUrlService } from './interfaces/url-service.interface';
import { URL_MESSAGES } from './messages/url.messages';

@Injectable()
export class UrlService implements IUrlService {
  constructor(
    @Inject(URL_REPO) private readonly urlRepo: IUrlRepo,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async generateUrl(ogUrl: string): Promise<IApiResponse<string>> {
    const existing = await this.urlRepo.findByUrl(ogUrl);
    if (existing) {
      return { message: URL_MESSAGES.ALREADY_EXISTS, data: existing.shortUrl };
    }

    const shortId = nanoid(8);
    const shortUrl = `${this.config.get('BASE', { infer: true })}/${shortId}`;
    const created = await this.urlRepo.create({ shortId, originalUrl: ogUrl, shortUrl });
    return { message: URL_MESSAGES.CREATED, data: created.shortUrl };
  }

  async redirectUrl(shortId: string): Promise<string> {
    const url = await this.urlRepo.findOne({ shortId });
    if (!url) throw new NotFoundException(URL_MESSAGES.NOT_FOUND);
    return url.originalUrl;
  }
}