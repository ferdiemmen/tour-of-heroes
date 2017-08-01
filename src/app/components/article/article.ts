
import * as moment from 'moment';
import { User } from '../user/user';
import { Category } from '../category/category';
import { Media } from '../media/media';
import { Feed } from '../feed/feed';
import { Snippet } from '../snippet/snippet';
import { Site } from '../site/site';

export class Article {
  id: number;
  author: User;
  title: string;
  subtitle: string;
  intro: string;
  media: Media;
  flatpageSlug: string;
  publishDate: string;
  expiryDate: string;
  category: Category[];
  seoScore: number;
  published: boolean;
  isPartner: boolean;
  isFlatpage: boolean;
  showComments: boolean;
  featured: boolean;
  RATable: Feed[];
  site: Site[];
  uuid: string;
  frontendUrls: object;
  snippetsJson: Snippet[];
  headerCrop: string;

  constructor(article?: object) {
    this.author = null;
    this.title = (article) ? article['title'] : '';
    this.subtitle = '';
    this.intro = '';
    this.media = null;
    this.flatpageSlug = '';
    this.publishDate = (article) ? article['publishDate'] : moment().format();
    this.expiryDate = '';
    this.category = (article) ? article['category'] : [];
    this.seoScore = 0;
    this.published = false;
    this.isPartner = false;
    this.isFlatpage = false;
    this.showComments = false;
    this.frontendUrls = (article) ? article['frontendUrls'] : {};
    this.featured = false;
    this.RATable = [];
    this.site = [];
    this.snippetsJson = [];
    this.uuid = '';
    this.headerCrop = 'center';
  }
}
