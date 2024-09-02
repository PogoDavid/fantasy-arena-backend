import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { League } from '../entities/league.entity';
import { User } from '../entities/user.entity';
import { LeagueType } from 'src/entities/league-type.entity';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([League, User, LeagueType])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
