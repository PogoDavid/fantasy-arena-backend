import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { LeagueType } from 'src/entities/league-type.entity';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  type: LeagueType;

  @IsNumber()
  @IsOptional()
  budget?: number;
}
