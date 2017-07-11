
import * as moment from 'moment';
import { User } from '../user/user';
import { Category } from '../category/category';
import { Media } from '../media/media';
import { Feed } from '../feed/feed';
import { Site } from '../site/site';

export class Article {
  id: number;
  author: User;
  title: string;
  subtitle: string;
  intro: string;
  media: Media;
  publishDate: string;
  expiryDate: string;
  category: Category[];
  seoScore: number;
  published: boolean;
  isPartner: boolean;
  showComments: boolean;
  featured: boolean;
  RATable: Feed[];
  site: Site[];
  headerCrop: string;

  constructor() {
    this.author = null;
    this.title = '';
    this.subtitle = '';
    this.intro = '';
    this.media = null;
    this.publishDate = moment().format();
    this.expiryDate = '';
    this.category = [];
    this.seoScore = 0;
    this.published = false;
    this.isPartner = false;
    this.showComments = false;
    this.featured = false;
    this.RATable = [];
    this.site = [];
    this.headerCrop = 'center';
  }
}
