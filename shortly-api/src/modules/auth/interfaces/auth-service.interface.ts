import type { IApiResponse } from '../../../common/interfaces/api-response.interface';
import type { UserResponseDTO } from '../../user/interfaces/user.interface';
import type { CreateUserRequestDTO } from '../dtos/create-user.dto';
import type { LoginRequestDTO } from '../dtos/login.dto';
import type { VerifyOtpRequestDTO } from '../dtos/verify-otp.dto';

export interface AuthResponseDTO {
  user: UserResponseDTO;
  jwtToken: string;
  refreshToken: string;
}

export interface RefreshTokenDTO {
  newAccessToken: string;
}

export interface IAuthService {
  login(data: LoginRequestDTO): Promise<IApiResponse<AuthResponseDTO>>;
  verifyOtp(data: VerifyOtpRequestDTO): Promise<IApiResponse<AuthResponseDTO>>;
  register(data: CreateUserRequestDTO): Promise<IApiResponse>;
  resendOtp(email: string): Promise<IApiResponse>;
  refreshToken(refreshToken: string): Promise<IApiResponse<RefreshTokenDTO>>;
}