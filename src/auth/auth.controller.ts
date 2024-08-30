import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      console.error('Error in register:', error);
      throw new InternalServerErrorException(
        error.message || 'Registration failed',
      );
    }
  }

  @Post('logout')
  async logout() {
    try {
      return this.authService.logout();
    } catch (error) {
      console.error('Error in logout:', error);
      throw new InternalServerErrorException(error.message || 'Logout failed');
    }
  }
}
