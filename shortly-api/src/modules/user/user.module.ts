import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_REPO } from './interfaces/user-repo.interface';
import { UserRepo } from './user.repo';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [{ provide: USER_REPO, useClass: UserRepo }],
  exports: [USER_REPO],
})
export class UserModule {}