
import * as moment from 'moment';
import { User } from '../user/user';
import { Category } from '../category/category';

export class Article {
  id: number;
  author: User;
  title: string;
  subtitle: string;
  publishDate: string;
  expiryDate: string;
  category: Category;

  constructor() {
    this.author = null;
    this.title = '';
    this.subtitle = '';
    this.publishDate = moment().format();
    this.expiryDate = '';
    this.category = null;
  }
}
