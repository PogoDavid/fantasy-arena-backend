import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeagueTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
