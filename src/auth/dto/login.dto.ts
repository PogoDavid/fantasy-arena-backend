import {
  IsEmail,
  IsNotEmpty,
  IsString,
  // IsOptional
  // IsBoolean
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  /* For Later
  
    'Remember Me' functionality

    @IsOptional()
    @IsBoolean()
    rememberMe?: boolean;

    Capture device information

    @IsOptional()
    @IsString()
    deviceName?: string;
  
  */
}
