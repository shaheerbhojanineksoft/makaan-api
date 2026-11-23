import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../users/accounts.service';
import { GoogleSignInDto } from './dto/google-signin.dto';
import { GoogleTokenService } from './google-token.service';

const JWT_EXPIRES_IN = '24h';

@Injectable()
export class AuthService {
  constructor(
    private readonly googleTokenService: GoogleTokenService,
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async googleSignIn(dto: GoogleSignInDto) {
    const payload = await this.googleTokenService.verifyIdToken(dto.idToken);
    const email = String(payload.email).trim().toLowerCase();
    const fullname = String(payload.name || '').trim();
    const profilePicture = String(payload.picture || '').trim();

    let account = await this.accountsService.findByEmail(dto.type, email);
    if (!account) {
      account = await this.accountsService.createAccount(
        dto.type,
        email,
        fullname,
        profilePicture,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: String(account._id),
      type: dto.type,
      email,
    });

    return {
      accessToken,
      expiresIn: JWT_EXPIRES_IN,
      account: this.accountsService.toSafeProfile(dto.type, account),
    };
  }
}
