import type { AuthResponseDTO } from '../auth/interfaces/auth-service.interface';
import type { IUser, UserResponseDTO } from './interfaces/user.interface';

export class UserMapper {
  static toResponseDTO(user: IUser): UserResponseDTO {
    return { id: user.id, name: user.name, email: user.email };
  }

  static toAuthResponseDTO(user: IUser, accessToken: string, refreshToken: string): AuthResponseDTO {
    return {
      user: UserMapper.toResponseDTO(user),
      jwtToken: accessToken,
      refreshToken,
    };
  }
}