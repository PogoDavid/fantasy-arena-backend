import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity';
import { Role } from 'src/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}
