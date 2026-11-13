import { Body, Controller, Get, Param, Post, Query, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { urlSchema, type CreateUrlDto } from './dtos/create-url.dto';
import { UrlService } from './url.service';
import { URL_MESSAGES } from './messages/url.messages';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('url')
  generateUrl(@Body(new ZodValidationPipe(urlSchema)) dto: CreateUrlDto, @Req() req: Request) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException(URL_MESSAGES.LOGIN);
    }
    return this.urlService.generateUrl(dto.url, userId);
  }

  @Get('url/all')
  getAllUrls(@Req() req: Request, @Query('page') page?: string) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException(URL_MESSAGES.LOGIN);
    }
    return this.urlService.getMyUrls(userId, Number(page) || 1);
  }
  @Public()
  @Get(':shortId')
  async redirectUrl(@Param('shortId') shortId: string, @Res() res: Response) {
    const target = await this.urlService.redirectUrl(shortId);
    res.redirect(target);
  }
}
