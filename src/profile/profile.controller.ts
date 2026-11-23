import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentAccount } from '../auth/current-account.decorator';
import type { CurrentAccountPayload } from '../auth/current-account.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountsService } from '../users/accounts.service';
import { UpdateAgencyProfileDto } from '../users/dto/update-agency-profile.dto';
import { UpdateLawyerProfileDto } from '../users/dto/update-lawyer-profile.dto';
import { UpdateUserProfileDto } from '../users/dto/update-user-profile.dto';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get current account profile',
    description: 'Works for user, agency, and lawyer based on JWT type',
  })
  getMe(@CurrentAccount() account: CurrentAccountPayload) {
    return this.accountsService.getMe(account.accountId, account.type);
  }

  @Patch('user')
  @ApiOperation({ summary: 'Update user profile' })
  updateUser(
    @CurrentAccount() account: CurrentAccountPayload,
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.accountsService.updateUserProfile(
      account.accountId,
      account.type,
      dto,
    );
  }

  @Patch('lawyer')
  @ApiOperation({ summary: 'Update lawyer profile' })
  updateLawyer(
    @CurrentAccount() account: CurrentAccountPayload,
    @Body() dto: UpdateLawyerProfileDto,
  ) {
    return this.accountsService.updateLawyerProfile(
      account.accountId,
      account.type,
      dto,
    );
  }

  @Patch('agency')
  @ApiOperation({ summary: 'Update agency profile' })
  updateAgency(
    @CurrentAccount() account: CurrentAccountPayload,
    @Body() dto: UpdateAgencyProfileDto,
  ) {
    return this.accountsService.updateAgencyProfile(
      account.accountId,
      account.type,
      dto,
    );
  }
}
