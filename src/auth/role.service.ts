import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.ensureBasicRoleExists();
  }

  private async ensureBasicRoleExists() {
    const basicRole = await this.roleRepository.findOne({
      where: { name: 'basic' },
    });
    if (!basicRole) {
      const newRole = this.roleRepository.create({ name: 'basic' });
      await this.roleRepository.save(newRole);
      console.log('Basic role created');
    }
  }
}
