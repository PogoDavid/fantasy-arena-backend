import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<{ id: number }> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ id: number }> {
    return this.userService.remove(id);
  }
}
