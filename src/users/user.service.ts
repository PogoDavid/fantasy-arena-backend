import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    try {
      let roles: Role[] = [];

      if (createUserDto.roles && createUserDto.roles.length > 0) {
        roles = await this.roleRepository.findBy({
          id: In(createUserDto.roles),
        });
      }

      const user = this.userRepository.create({
        ...createUserDto,
        roles,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDTO,
  ): Promise<{ id: number }> {
    try {
      const updateData: Partial<User> = { ...updateUserDto };

      if (updateUserDto.roles && updateUserDto.roles.length > 0) {
        const roles = await this.roleRepository.findBy({
          id: In(updateUserDto.roles),
        });
        updateData.roles = roles;
      }

      await this.userRepository.update(id, updateData);

      return { id };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<{ id: number }> {
    try {
      await this.userRepository.delete(id);

      return { id };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
