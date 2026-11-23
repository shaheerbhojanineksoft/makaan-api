import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ACCOUNT_TYPES } from '../../common/account-type';
import type { AccountType } from '../../common/account-type';

export class GoogleSignInDto {
  @ApiProperty({ description: 'Google OAuth ID token' })
  @IsString()
  @IsNotEmpty()
  idToken!: string;

  @ApiProperty({ enum: ACCOUNT_TYPES, example: 'user' })
  @IsString()
  @IsIn([...ACCOUNT_TYPES])
  type!: AccountType;
}
