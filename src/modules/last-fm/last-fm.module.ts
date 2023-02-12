import { LastFmController } from './last-fm.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ILastFmConfig } from '../../commons/configs/last-fm/last-fm.config.interface';
import { LastFmService } from './last-fm.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { baseUrl, apiKey } = configService.get<ILastFmConfig>('lastFm');
        return {
          url: `${baseUrl}api_key=${apiKey}&format=json`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [LastFmController],
  providers: [LastFmService],
})
export class LastFmModule {}
