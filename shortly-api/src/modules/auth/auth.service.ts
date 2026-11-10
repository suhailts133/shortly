import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import type { HydratedDocument } from 'mongoose';
import { comparePassword, hashPassword } from '../../common/utils/hash-password';
import { generateOtp } from '../../common/utils/generate-otp';
import type { IApiResponse } from '../../common/interfaces/api-response.interface';
import { BrevoEmail } from '../../infrastructure/email/brevo.email';
import { REDIS_REPO, type IRedisRepo } from '../../infrastructure/redis/redis.interface';
import { USER_REPO, type IUserRepo } from '../user/interfaces/user-repo.interface';
import type { User } from '../user/user.schema';
import { UserMapper } from '../user/user.mapper';
import type { CreateUserRequestDTO } from './dtos/create-user.dto';
import type { LoginRequestDTO } from './dtos/login.dto';
import type { VerifyOtpRequestDTO } from './dtos/verify-otp.dto';
import type { AuthResponseDTO, IAuthService, RefreshTokenDTO } from './interfaces/auth-service.interface';
import { TokenService } from './jwt/token.service';
import type { JwtData } from './jwt/jwt.types';
import { AUTH_MESSAGES } from './messages/auth.messages';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(REDIS_REPO) private readonly redisRepo: IRedisRepo,
    private readonly tokens: TokenService,
    private readonly email: BrevoEmail,
  ) {}

  async refreshToken(refreshToken: string): Promise<IApiResponse<RefreshTokenDTO>> {
    // verifyRefresh throws UnauthorizedException on a bad or expired token
    const { email, userId, name } = this.tokens.verifyRefresh(refreshToken);
    const newAccessToken = this.tokens.signAccess({ email, userId, name });
    return { message: AUTH_MESSAGES.NEW_TOKEN_CREATED, data: { newAccessToken } };
  }

  async login(data: LoginRequestDTO): Promise<IApiResponse<AuthResponseDTO>> {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);

    return { message: AUTH_MESSAGES.LOGIN_SUCCESS, data: this.buildAuthResponse(user) };
  }

  async register(data: CreateUserRequestDTO): Promise<IApiResponse> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new ConflictException(AUTH_MESSAGES.ALREADY_EXISTS);

    const otp = generateOtp();
    const password = await hashPassword(data.password);

    const saved = await this.redisRepo.saveUserData({ name: data.name, email: data.email, otp, password });
    if (!saved) throw new InternalServerErrorException(AUTH_MESSAGES.REGISTER_FAILED);

    const sent = await this.email.sendVerificationEmail(data.email, otp);
    if (!sent) throw new InternalServerErrorException(AUTH_MESSAGES.OTP_FAILED);

    return { message: AUTH_MESSAGES.REGISTER_SUCCESS };
  }

  async verifyOtp(data: VerifyOtpRequestDTO): Promise<IApiResponse<AuthResponseDTO>> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new ConflictException(AUTH_MESSAGES.ALREADY_EXISTS);

    const pending = await this.redisRepo.getUserData(data.email);
    if (!pending) throw new BadRequestException(AUTH_MESSAGES.OTP_EXPIRED);
    if (pending.otp !== data.otp) throw new BadRequestException(AUTH_MESSAGES.OTP_INCORRECT);

    const newUser = await this.userRepo.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
    });
    await this.redisRepo.deleteUserData(newUser.email);

    return { message: AUTH_MESSAGES.OTP_SUCCESS, data: this.buildAuthResponse(newUser) };
  }

  async resendOtp(email: string): Promise<IApiResponse> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new ConflictException(AUTH_MESSAGES.ALREADY_EXISTS);

    const otp = generateOtp();
    const updated = await this.redisRepo.editUserData(otp, email);
    if (!updated) throw new BadRequestException(AUTH_MESSAGES.OTP_EXPIRED);

    const sent = await this.email.sendVerificationEmail(email, otp);
    if (!sent) throw new InternalServerErrorException(AUTH_MESSAGES.OTP_FAILED);

    return { message: AUTH_MESSAGES.OTP_RESEND };
  }

  // login and verifyOtp built the same payload and tokens, so it lives in one place
  private buildAuthResponse(user: HydratedDocument<User>): AuthResponseDTO {
    const payload: JwtData = { email: user.email, userId: user.id, name: user.name };
    return UserMapper.toAuthResponseDTO(
      user,
      this.tokens.signAccess(payload),
      this.tokens.signRefresh(payload),
    );
  }
}