import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async register(registerDto: RegisterDTO) {
    try {
      const basicRole = await this.roleRepository.findOne({
        where: { name: 'basic' },
      });
      if (!basicRole) {
        throw new InternalServerErrorException('Basic role not found');
      }

      const user = await this.usersService.create({
        ...registerDto,
        roles: [basicRole.id],
      });

      await this.usersService.save(user);

      const roles = user.roles.map((role) => role.name);
      const payload = { email: user.email, sub: user.id, roles };

      return {
        user: { email: user.email, id: user.id },
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error during register:', error);
      throw new InternalServerErrorException(
        error.message || 'Registration failed',
      );
    }
  }

  async login(loginDto: LoginDTO) {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email);

      if (user && bcrypt.compareSync(loginDto.password, user.password)) {
        const roles = user.roles ? user.roles.map((role) => role.name) : [];
        const payload = { email: user.email, sub: user.id, roles };

        return {
          user: { email: user.email, id: user.id },
          token: this.jwtService.sign(payload),
        };
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }

  async logout() {
    try {
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error during logout:', error);
      throw new InternalServerErrorException(error.message || 'Logout failed');
    }
  }
}
