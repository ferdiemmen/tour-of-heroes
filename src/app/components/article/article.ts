
import * as moment from 'moment';
import { User } from '../user/user';
import { Category } from '../category/category';
import { Feed } from '../feed/feed';

export class Article {
  id: number;
  author: User;
  title: string;
  subtitle: string;
  publishDate: string;
  expiryDate: string;
  category: Category;
  seoScore: number;
  published: boolean;
  isPartner: boolean;
  showComments: boolean;
  featured: boolean;
  RATable: Feed[];

  constructor() {
    this.author = null;
    this.title = '';
    this.subtitle = '';
    this.publishDate = moment().format();
    this.expiryDate = '';
    this.category = null;
    this.seoScore = 0;
    this.published = false;
    this.isPartner = false;
    this.showComments = false;
    this.featured = false;
    this.RATable = [];
  }
}
