import { Controller, Get, Param, Query } from '@nestjs/common';

import { LastFmService } from './last-fm.service';

@Controller('last-fm')
export class LastFmController {
  constructor(private readonly service: LastFmService) {}

  @Get('artists')
  async getTopArtists(
    @Query() query: { page: number; pageSize: number; country: string },
  ) {
    const { pageSize, country, page } = query;
    const result = await this.service.getTopArtists(country, pageSize, page);

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
    return result;
  }
}
