import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../entities/league.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { User } from '../entities/user.entity';
import { LeagueType } from '../entities/league-type.entity';
import { CreateLeagueTypeDto } from './dto/create-league-type.dto';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    @InjectRepository(LeagueType)
    private readonly leagueTypeRepository: Repository<LeagueType>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto, user: User): Promise<League> {
    try {
      const leagueType = await this.findLeagueTypeById(createLeagueDto.typeId);
      const league = this.createLeagueEntity(createLeagueDto, leagueType, user);
      return await this.leagueRepository.save(league);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('League type already exists');
      }

      throw error;
    }
  }

  async update(
    id: number,
    updateLeagueDto: UpdateLeagueDto,
    user: User,
  ): Promise<League> {
    const league = await this.findLeagueById(id);
    this.validateLeagueOwnership(league, user);

    if (updateLeagueDto.typeId) {
      const newLeagueType = await this.findLeagueTypeById(
        updateLeagueDto.typeId,
      );
      league.leagueType = newLeagueType;
    }

    Object.assign(league, updateLeagueDto);
    return await this.leagueRepository.save(league);
  }

  async createLeagueType(
    createLeagueTypeDto: CreateLeagueTypeDto,
  ): Promise<LeagueType> {
    const leagueType = this.leagueTypeRepository.create(createLeagueTypeDto);
    return await this.leagueTypeRepository.save(leagueType);
  }

  async findOne(id: number): Promise<League> {
    const league = await this.findLeagueById(id);
    return league;
  }

  async findAll(user: User): Promise<League[]> {
    return await this.leagueRepository.find({
      where: { user: { id: user.id } },
      relations: ['leagueType'],
    });
  }

  private async findLeagueTypeById(id: number): Promise<LeagueType> {
    const leagueType = await this.leagueTypeRepository.findOne({
      where: { id },
    });
    if (!leagueType) {
      throw new NotFoundException('League type not found');
    }
    return leagueType;
  }

  private createLeagueEntity(
    createLeagueDto: CreateLeagueDto,
    leagueType: LeagueType,
    user: User,
  ): League {
    const league = new League();
    league.name = createLeagueDto.name;
    league.leagueType = leagueType;
    league.budget = createLeagueDto.budget;
    league.user = user;
    return league;
  }

  private async findLeagueById(id: number): Promise<League> {
    const league = await this.leagueRepository.findOne({
      where: { id },
      relations: ['user', 'leagueType'],
    });
    if (!league) {
      throw new NotFoundException('League not found');
    }
    return league;
  }

  private validateLeagueOwnership(league: League, user: User): void {
    if (league.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this league');
    }
  }
}
