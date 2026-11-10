import { Module } from '@nestjs/common';
import { BrevoEmail } from './brevo.email';

@Module({
  providers: [BrevoEmail],
  exports: [BrevoEmail],
})
export class EmailModule {}