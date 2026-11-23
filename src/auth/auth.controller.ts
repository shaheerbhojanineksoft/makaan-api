import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleSignInDto } from './dto/google-signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  @ApiOperation({ summary: 'Sign in with Google ID token' })
  googleSignIn(@Body() dto: GoogleSignInDto) {
    return this.authService.googleSignIn(dto);
  }
}
