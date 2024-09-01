import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { League } from '../entities/league.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, User])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
