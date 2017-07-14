
import { Injectable } from '@angular/core';

import { Article } from './article';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';
import { User } from '../user/user';
import { AuthorService } from '../author/author.service';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { DeferredService } from '../deferred/deferred.service';
import { Feed } from '../feed/feed';
import { FeedService } from '../feed/feed.service';
import { SiteService } from '../site/site.service';


@Injectable()
export class ArticleService {
  public article: Article = new Article();
  public articles: Article[] = [];
  public pages: Article[] = [];

  private articlesUrl = 'modules/articles'; // URL to web api

  constructor(
    public categoryService: CategoryService,
    public authorService: AuthorService,
    public deferredService: DeferredService,
    public feedService: FeedService,
    public siteService: SiteService,
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getArticle(id: number): Promise<Article> {
    const url = `${this.articlesUrl}/${id}/`;
    const cacheKey = `article_${id}`;

    if (!id) {
      if (!this.deferredService.get()) {
        // Clear previous Article instance on service.
        this.article = new Article();
      }

      // Set article defaults.
      this.setDefaults();
      return Promise.resolve(this.article as Article);
    } else {
      // Clear previous Article instance on service.
      this.article = new Article();
      this.deferredService.reset();
    }


    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      this.article = this.cacheService.getCache(cacheKey);

      return Promise.resolve(this.article as Article);
    }

    return this.apiService
      .get(url)
      .then(response => {
        // Set article on this service.
        this.article = response.json() as Article;

        // Add response to cache.
        this.cacheService.setCache(cacheKey, response.json() as Article);

        return this.article as Article;
      });
  }

  getArticles(page: number, pages?: boolean): Promise<Article[]> {
    let url = `${this.articlesUrl}/site/2/${(pages) ? 'flatpages/' : ''}20/?admin_view=true`;
    const cacheKey = (pages) ? 'pages' : 'articles';

    if (page) {
      url = url += '?page=' + page;
    }

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      this[(pages) ? 'pages' : 'articles'] = this.cacheService.getCache(cacheKey) as Article[];
    }

    return this.apiService
      .get(url)
      .then(response => {

        // Set articles on this service.
        this[(pages) ? 'pages' : 'articles'] = response.json().results as Article[];

        // Add articles to cache.
        this.cacheService.setCache(cacheKey, this[(pages) ? 'pages' : 'articles']);

        return this[(pages) ? 'pages' : 'articles'];
      });
  }

  create(): Promise<Article> {
    const url = `${this.articlesUrl}`;

    return this.apiService
      .put(url, this.article)
      .then(response => {
        // Set new article on this service.
        this.article = response.json().data as Article;

        // Add article to cached articles.
        this.cacheService
          .addToCacheArray('articles', response.json().data as Article);

        // Add article to articles.
        this.articles.unshift(this.article);

        return this.article;
      });
  }

  update(): Promise<Article> {
    const url = `${this.articlesUrl}/${this.article.id}/`;
    return this.apiService
      .post(url, this.article)
      .then(response => {

        this.article = response.json() as Article;

        // Update article in cached articles.
        this.cacheService
          .updateObjectInCacheArray('articles', this.article);
        this.cacheService
          .updateObject(`article_${this.article.id}`, this.article);

        // Update article in articles.
        this.articles[this.articles.findIndex(el => el.id === this.article.id)] = this.article;

        return response;
      })
  }

  private setDefault(property: string): void {
    switch (property) {
      case 'author':
        // A new article doesn't have a author by default. After we got
        // all the authors we set it to the site's default author.
        this.article[property] = this.authorService.authors
                                                  .find(a => a.slug === 'monstercrab'); // @TODO: Get from site's default.
        break;
      case 'category':
        // A new article doesn't have a category by default. After we got
        // all the categories we set it to the site's default category.
        this.article[property][0] = this.categoryService.categories
                                                  .find(c => c.slug === 'nieuws'); // @TODO: Get from site's default.
        break;
      case 'RATable':
        // A new article doesn't have feeds by default. After we got
        // all the feeds we set it to the site's default feeds.
        this.feedService.feeds.map(f => {
          if (f['default']) {
            this.toggleProperty(property, f);
          }
        });
        break;
      case 'site':
        // A new article doesn't have site by default. After we got
        // all the sites we set it to the site's.
        this.siteService.sites.map(s => {
          if (s.id === 2) {
            this.toggleProperty(property, s);
          }
        });
        break;
      default:
        break;
    }
  }

  updateProperty(property: string, value: any) {
    this.article[property] = value;
    this.cacheService.updateObject(`article_${this.article.id}`, this.article);
  }

  hasProperty(property, value) {
    if (!this.article[property]) {
      return false;
    }

    return this.article[property].some(o => {
      if (o.id === value.id) {
        return true;
      }
      return false;
    });
  }

  setDefaults() {

    // Get categories, authors and feeds. Set the defaults for this article.
    this.categoryService.getCategories().then(_ => this.setDefault('category'));
    this.authorService.getAuthors().then(_ => this.setDefault('author'));
    this.feedService.getFeeds().then(_ => this.setDefault('RATable'));
    this.siteService.getSites().then(_ => this.setDefault('site'));
  }

  toggleProperty(property: string, obj: object) {
    if (!this.article[property]) { this.article[property] = [] }

    // Toggle a property on the article.
    if (this.article[property].findIndex(el => el.id === obj['id']) !== -1) {
      this.article[property].splice([this.article[property].findIndex(el => el.id === obj['id'])], 1);
    } else {
      this.article[property].push(obj);
    }
  }
}
