import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('leagues')
@UseGuards(JwtAuthGuard)
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  createLeague(
    @Body() createLeagueDto: CreateLeagueDto,
    @GetUser() user: User,
  ) {
    return this.leagueService.create(createLeagueDto, user);
  }

  @Put(':id')
  updateLeague(
    @Param('id') id: number,
    @Body() updateLeagueDto: UpdateLeagueDto,
    @GetUser() user: User,
  ) {
    return this.leagueService.update(id, updateLeagueDto, user);
  }
}
