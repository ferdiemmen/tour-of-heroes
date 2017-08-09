
import * as moment from 'moment';

import { Media } from '../media/media';
import { Site } from '../site/site';
import { Snippet } from '../snippet/snippet';
import { Area } from './area';

declare var _rs: any;


export class Block {
  id: number;
  area: Area;
  published: boolean;
  publishDate: string;
  expiryDate: string;
  showTitle: boolean;
  site: Site[];
  snippetsJson: Snippet[];
  snippetsMediaObjects: Media[];
  tags: string;
  title: string;
  weight: number;

  constructor(block?: object) {
    this.published = false;
    this.publishDate = (block) ? block['publishDate'] : moment().format();
    this.expiryDate = '';
    this.showTitle = true;
    this.site = [_rs.siteId];
    this.snippetsJson = [];
    this.snippetsMediaObjects = [];
    this.tags = '';
    this.title = '';
  }
}
