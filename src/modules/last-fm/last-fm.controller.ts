import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { LastFmService } from './last-fm.service';

@Controller('last-fm')
export class LastFmController {
  constructor(private readonly service: LastFmService) {}

  @Get('artists')
  async getTopArtists(
    @Query() query: { page: number; pageSize: number; country: string },
  ) {
    console.log(query);
    const { pageSize, country, page } = query;
    const result = await this.service.getTopArtists(country, pageSize, page);
    console.log(result);
    return result;
    return { data: result.artist, total: result['@attr'].total };
  }

  @Get('artists/:mbid/topTracks')
  async getTopTracks(
    @Param('mbid') mbid: string,
    @Query() query: { page: number; pageSize: number; country: string },
  ) {
    const { pageSize, page } = query;
    const result = await this.service.getTopTracksByArtist(
      mbid,
      pageSize,
      page,
    );
    console.log(mbid, query, result.track.length);
    return result;
  }
}
