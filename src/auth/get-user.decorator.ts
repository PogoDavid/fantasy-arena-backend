import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from 'src/users/user.service';

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const moduleRef = request.moduleRef;

    if (request.user && request.user.userId) {
      try {
        const usersService = moduleRef.get(UsersService, { strict: false });
        const user = await usersService.findOne(request.user.id);
        return user;
      } catch (error: any) {
        console.log(error);
        return null;
      }
    }
    return null;
  },
);

// Add this to your main module or the module where you use the decorator
export const ModuleRefProvider = {
  provide: 'ModuleRef',
  useExisting: ModuleRef,
};
