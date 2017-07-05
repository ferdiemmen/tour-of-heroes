
import * as moment from 'moment';
import { Category } from '../category/category';

export class Article {
  id: number;
  title: string;
  subtitle: string;
  publishDate: string;
  expiryDate: string;
  category: Category;

  constructor() {
    this.title = '';
    this.subtitle = '';
    this.publishDate = moment().format();
    this.expiryDate = '';
    this.category = null;
  }
}
