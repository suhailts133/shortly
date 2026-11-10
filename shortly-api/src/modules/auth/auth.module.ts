import { Module } from '@nestjs/common';
import { EmailModule } from '../../infrastructure/email/email.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './jwt/token.service';

@Module({
  imports: [UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}