import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateLeagueTypeDto } from './dto/create-league-type.dto';

@Controller('leagues')
@UseGuards(JwtAuthGuard)
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  async createLeague(
    @Body() createLeagueDto: CreateLeagueDto,
    @GetUser() user: User,
  ) {
    return this.leagueService.create(createLeagueDto, user);
  }

  @Get()
  async getLeagues(@GetUser() user: User) {
    return this.leagueService.findAll(user);
  }

  @Get(':id')
  async getLeague(@Param('id', ParseIntPipe) id: number) {
    return this.leagueService.findOne(id);
  }

  @Put(':id')
  async updateLeague(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeagueDto: UpdateLeagueDto,
    @GetUser() user: User,
  ) {
    return this.leagueService.update(id, updateLeagueDto, user);
  }

  @Post('types')
  async createLeagueType(@Body() createLeagueTypeDto: CreateLeagueTypeDto) {
    return this.leagueService.createLeagueType(createLeagueTypeDto);
  }
}
