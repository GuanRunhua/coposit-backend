import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILastFmConfig } from '../../commons/configs/last-fm/last-fm.config.interface';

@Injectable()
export class AppService {
  private _config: ILastFmConfig;
  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<ILastFmConfig>('lastFm');
    this._config = config;
  }

  getHello(): string {
    console.log(this._config);
    return 'Hello World!';
  }
}
