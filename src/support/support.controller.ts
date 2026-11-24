import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentAccount } from '../auth/current-account.decorator';
import type { CurrentAccountPayload } from '../auth/current-account.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { SupportService } from './support.service';

@ApiTags('support')
@ApiBearerAuth()
@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('requests')
  @ApiOperation({ summary: 'Create agency support request' })
  create(
    @CurrentAccount() account: CurrentAccountPayload,
    @Body() dto: CreateSupportRequestDto,
  ) {
    return this.supportService.create(account.accountId, account.type, dto);
  }

  @Get('requests')
  @ApiOperation({ summary: 'List my agency support requests' })
  listMine(@CurrentAccount() account: CurrentAccountPayload) {
    return this.supportService.listMine(account.accountId, account.type);
  }

  @Get('requests/:id')
  @ApiOperation({ summary: 'Get one of my agency support requests' })
  getMine(
    @CurrentAccount() account: CurrentAccountPayload,
    @Param('id') id: string,
  ) {
    return this.supportService.getMine(account.accountId, account.type, id);
  }
}
