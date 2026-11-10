import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { urlSchema, type CreateUrlDto } from './dtos/create-url.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  
  @Post('url')
  generateUrl(@Body(new ZodValidationPipe(urlSchema)) dto: CreateUrlDto) {
    return this.urlService.generateUrl(dto.url);
  }


  @Public()
  @Get(':shortId')
  async redirectUrl(@Param('shortId') shortId: string, @Res() res: Response) {
    const target = await this.urlService.redirectUrl(shortId);
    res.redirect(target); 
  }
}