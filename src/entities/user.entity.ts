import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  @Length(4, 255)
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  verified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'verified_at' })
  verifiedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
