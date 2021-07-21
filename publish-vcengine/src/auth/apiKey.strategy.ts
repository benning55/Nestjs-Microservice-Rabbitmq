import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';

export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  async validate(
    apiKey: string,
    done: (error: Error, data) => {},
  ): Promise<any> {
    if (apiKey !== process.env.API_KEY) {
      done(new UnauthorizedException(), null);
    }

    done(null, true);
  }
}
