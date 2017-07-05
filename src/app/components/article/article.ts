
import * as moment from 'moment';

export class Article {
  id: number;
  title: string;
  subtitle: string;
  publishDate: string;
  expiryDate: string;

  constructor() {
    this.title = '';
    this.subtitle = '';
    this.publishDate = moment().format();
    this.expiryDate = '';
  }
}
