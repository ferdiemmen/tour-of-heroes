
import * as moment from 'moment';
import { GridElement } from './grid-element';
import { Site } from '../site/site';

declare var _rs: any;

export class Grid {
  id: number;
  title: string;
  active: boolean;
  published: boolean;
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
  elements: GridElement[];
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  publishDate: string;
  site: Site[];

  constructor(grid?: object) {
    this.id = (grid) ? grid['id'] : null;
    this.title = (grid) ? grid['title'] : moment().format('DD-MM-YYYY HH:mm');
    this.active = false;
    this.published = false;
    this.elements = [];
    this.width = 960;
    this.height = 480;
    this.cellWidth = 32;
    this.cellHeight = 32;
    this.site = [_rs.siteId];
    this.publishDate = (grid) ? grid['publishDate'] : moment().format();

    if (grid) {
      grid['elements'].forEach(element => {
        this.elements.push(new GridElement(element));
      });
    }
  }
}
