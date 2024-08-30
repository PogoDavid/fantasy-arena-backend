import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDTO {
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
}
