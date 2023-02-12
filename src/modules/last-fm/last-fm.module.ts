import { LastFmController } from './last-fm.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LastFmService } from './last-fm.service';

@Module({
  imports: [ConfigModule],
  controllers: [LastFmController],
  providers: [LastFmService],
})
export class LastFmModule {}
