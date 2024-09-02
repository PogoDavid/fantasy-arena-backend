import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @IsNumber()
  @IsOptional()
  budget?: number;
}
