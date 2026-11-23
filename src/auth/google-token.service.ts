import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleTokenService {
  private readonly client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID') || undefined,
    );
  }

  async verifyIdToken(idToken: string): Promise<TokenPayload> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId || clientId.includes('your-google-oauth-client-id')) {
      throw new ServiceUnavailableException(
        'GOOGLE_CLIENT_ID is not configured',
      );
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      if (!payload?.email || !payload.email_verified) {
        throw new UnauthorizedException('Google email is not verified');
      }
      return payload;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ServiceUnavailableException
      ) {
        throw error;
      }
      throw new UnauthorizedException('Invalid Google ID token');
    }
  }
}
