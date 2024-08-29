import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  IsArray,
} from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @Length(4, 255)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(8, 255)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password too weak' },
  )
  password?: string;

  @IsArray()
  @IsOptional()
  roles?: Role[];
}
