import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URL_REPO } from './interfaces/url-repo.interface';
import { UrlController } from './url.controller';
import { UrlRepo } from './url.repo';
import { Url, UrlSchema } from './url.schema';
import { UrlService } from './url.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [UrlService, { provide: URL_REPO, useClass: UrlRepo }],
})
export class UrlModule {}