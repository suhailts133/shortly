import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import { createUserSchema, type CreateUserRequestDTO } from './dtos/create-user.dto';
import {  loginSchema, type LoginRequestDTO } from './dtos/login.dto';
import { refreshTokenSchema, type RefreshTokenRequestDTO } from './dtos/refresh-token.dto';
import { resendOtpSchema, type ResendOtpRequestDTO } from './dtos/resend-otp.dto';
import { verifyOtpSchema, type VerifyOtpRequestDTO } from './dtos/verify-otp.dto';

@Public() // every auth route is open, so one decorator on the class covers all five
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body(new ZodValidationPipe(refreshTokenSchema)) dto: RefreshTokenRequestDTO) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body(new ZodValidationPipe(loginSchema)) dto: LoginRequestDTO) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  register(@Body(new ZodValidationPipe(createUserSchema)) dto: CreateUserRequestDTO) {
    return this.authService.register(dto);
  }

  @Post('verify-otp') 
  verifyOtp(@Body(new ZodValidationPipe(verifyOtpSchema)) dto: VerifyOtpRequestDTO) {
    return this.authService.verifyOtp(dto);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  resendOtp(@Body(new ZodValidationPipe(resendOtpSchema)) dto: ResendOtpRequestDTO) {
    return this.authService.resendOtp(dto.email);
  }
}