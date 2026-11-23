import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from '../common/account-type';
import { AccountsService } from './accounts.service';
import {
  AgencyAccount,
  AgencyAccountSchema,
} from './schemas/agency.schema';
import {
  LawyerAccount,
  LawyerAccountSchema,
} from './schemas/lawyer.schema';
import { UserAccount, UserAccountSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: UserAccount.name, schema: UserAccountSchema }],
      DB_CONNECTION.user,
    ),
    MongooseModule.forFeature(
      [{ name: AgencyAccount.name, schema: AgencyAccountSchema }],
      DB_CONNECTION.agency,
    ),
    MongooseModule.forFeature(
      [{ name: LawyerAccount.name, schema: LawyerAccountSchema }],
      DB_CONNECTION.lawyer,
    ),
  ],
  providers: [AccountsService],
  exports: [AccountsService, MongooseModule],
})
export class UsersModule {}
