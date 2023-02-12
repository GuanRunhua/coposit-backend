import { IArtist } from './artist.interface';
import { IImage } from './image.interface';

export interface ITrack {
  name: string;
  playcount: string;
  listeners: string;
  url: string;
  streamable: string;
  artist: IArtist;
  image: IImage[];
  mbid?: string;
}
