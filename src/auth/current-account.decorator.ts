import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccountType } from '../common/account-type';

export type CurrentAccountPayload = {
  accountId: string;
  type: AccountType;
  email: string;
};

export const CurrentAccount = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentAccountPayload => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: CurrentAccountPayload }>();
    return request.user;
  },
);
