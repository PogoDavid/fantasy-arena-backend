import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateLeagueDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  budget?: number;
}
