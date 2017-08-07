
import * as moment from 'moment';

import { Media } from '../media/media';
import { Site } from '../site/site';
import { Snippet } from '../snippet/snippet';


export class Block {
  id: number;
  area: number;
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
    this.site = [];
    this.snippetsJson = [];
    this.snippetsMediaObjects = [];
    this.tags = '';
    this.title = '';
  }
}
