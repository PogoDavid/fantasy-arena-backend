import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../entities/league.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { User } from '../entities/user.entity';
import { LeagueType } from 'src/entities/league-type.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    @InjectRepository(LeagueType)
    private readonly leagueTypeRepository: Repository<LeagueType>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto, user: User): Promise<League> {
    const leagueType = await this.leagueTypeRepository.findOne({
      where: { id: createLeagueDto.type.id },
    });

    if (!leagueType) {
      throw new NotFoundException('League type not found');
    }

    const league = this.leagueRepository.create({
      ...createLeagueDto,
      type: leagueType,
      user,
    });

    return await this.leagueRepository.save(league);
  }

  async update(
    id: number,
    updateLeagueDto: UpdateLeagueDto,
    user: User,
  ): Promise<League> {
    const league = await this.leagueRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!league) {
      throw new ForbiddenException('League not found');
    }

    if (league.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this league');
    }

    Object.assign(league, updateLeagueDto);
    return await this.leagueRepository.save(league);
  }
}
