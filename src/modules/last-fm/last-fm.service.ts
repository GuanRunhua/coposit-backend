import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILastFmConfig } from '../../commons/configs/last-fm/last-fm.config.interface';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { IError } from './interfaces/base/error.interface';
import { ITopartists } from './interfaces/top-aritists.interface';
import { ITopTracks } from './interfaces/top-tracks.interface';
@Injectable()
export class LastFmService {
  private _axiosInstance: AxiosInstance;
  constructor(private readonly configService: ConfigService) {
    const { baseUrl, apiKey } = this.configService.get<ILastFmConfig>('lastFm');

    const instance = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });
    instance.interceptors.request.use((config) => {
      config.params = {
        api_key: apiKey,
        format: 'json',
        // spread the request's params
        ...config.params,
      };
      return config;
    });
    instance.interceptors.response.use(
      function (response) {
        // 6 : Invalid parameters - Your request is missing a required parameter
        // above errors will return 200
        if (response?.data?.error) {
          return Promise.reject(new BadRequestException(response.data.message));
        }
        return response;
      },
      function (error: AxiosError<IError>) {
        const errorMsg = error.response.data;
        return Promise.reject(
          new ServiceUnavailableException(errorMsg?.message),
        );
      },
    );
    this._axiosInstance = instance;
    // this._baseUrl = `${baseUrl}api_key=${apiKey}&format=json`;
  }

  async getTopArtists(country: string, limit = 5, page = 1) {
    console.log(limit, page);
    try {
      if (!country) {
        throw new BadRequestException('country is required');
      }
      const result = await this._axiosInstance.get<{ topartists: ITopartists }>(
        '',
        {
          params: {
            method: 'geo.gettopartists',
            country,
            limit,
            page,
          },
        },
      );
      return result.data?.topartists;
    } catch (error) {
      throw error;
    }
  }

  async getTopTracksByArtist(mbid: string, limit = 5, page = 1) {
    try {
      const result = await this._axiosInstance.get<{ toptracks: ITopTracks }>(
        '',
        {
          params: {
            method: 'artist.gettoptracks',
            mbid,
            limit,
            page,
          },
        },
      );
      return result.data.toptracks;
    } catch (error) {
      throw error;
    }
  }
}
