import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountType, isAccountType } from '../common/account-type';
import { AccountsService } from '../users/accounts.service';

export type WebJwtPayload = {
  sub: string;
  type: AccountType;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly accountsService: AccountsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'change-me',
    });
  }

  async validate(payload: WebJwtPayload) {
    if (!payload?.sub || !isAccountType(payload.type)) {
      throw new UnauthorizedException('Invalid token');
    }
    const account = await this.accountsService.findById(
      payload.type,
      payload.sub,
    );
    if (!account) {
      throw new UnauthorizedException('Account not found');
    }
    return {
      accountId: String(account._id),
      type: payload.type,
      email: payload.email,
    };
  }
}
