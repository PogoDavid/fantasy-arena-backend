import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(4, 255)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password too weak' },
  )
  password: string;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty({ message: 'Roles cannot be empty' })
  roles?: number[];
}
