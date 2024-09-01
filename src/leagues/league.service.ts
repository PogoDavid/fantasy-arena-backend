import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../entities/league.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto, user: User): Promise<League> {
    const league = this.leagueRepository.create({
      ...createLeagueDto,
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
