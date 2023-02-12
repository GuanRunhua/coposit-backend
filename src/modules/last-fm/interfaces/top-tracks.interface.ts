import { IAttr } from './base/attr.interface';
import { ITrack } from './base/track.interface';

export interface ITopTracks {
  track: ITrack[];
  '@attr': IAttr;
}
