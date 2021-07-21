import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
