import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateLeagueTypeDto } from './dto/create-league-type.dto';
import { UsersService } from 'src/users/user.service';

@Controller('leagues')
@UseGuards(JwtAuthGuard)
export class LeagueController {
  constructor(
    private readonly leagueService: LeagueService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async createLeague(
    @Body() createLeagueDto: CreateLeagueDto,
    @GetUser() decoratorUser: User,
  ) {
    const { userId } = decoratorUser as any;

    const user = await this.userService.findOne(userId);

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

  @Post('/types')
  createLeagueType(@Body() createLeagueTypeDto: CreateLeagueTypeDto) {
    return this.leagueService.createLeagueType(createLeagueTypeDto);
  }
}
