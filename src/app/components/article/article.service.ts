
import { Injectable, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Article } from './article';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';
import { ConfigService } from '../../app-config.service';
import { User } from '../user/user';
import { AuthorService } from '../author/author.service';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { DeferredService } from '../deferred/deferred.service';
import { Feed } from '../feed/feed';
import { FeedService } from '../feed/feed.service';
import { SiteService } from '../site/site.service';
import { SnippetService } from '../snippet/snippet.service';
import { PaginationService } from '../pagination/pagination.service';
import { LoadingService } from '../../loading.service';

declare var _rs: any;

const config = {
  paginationAmount: 30
}

@Injectable()
export class ArticleService {
  public article: Article = new Article();
  public articles: Article[] = [];
  public pages: Article[] = [];
  public paginationService: PaginationService;
  public loadingService: LoadingService;

  private _articlesUrl = 'modules/articles';
  private _articlesSearchUrl = 'modules/search/articles';
  private _pagesSearchUrl = 'modules/search/pages';

  constructor(
    public categoryService: CategoryService,
    public authorService: AuthorService,
    public feedService: FeedService,
    public siteService: SiteService,
    public snippetService: SnippetService,
    private _ngZone: NgZone,
    private _router: Router,
    private _location: Location,
    private _deferredService: DeferredService,
    private apiService: ApiService,
    private cacheService: CacheService) {
      this.snippetService = new SnippetService(this._ngZone);
      this.paginationService = new PaginationService();
      this.loadingService = new LoadingService();
    }

  getArticle(id: number): Promise<Article> {
    const url = `${this._articlesUrl}/${id}/`;
    const cacheKey = `article_${id}`;

    // Set article defaults.
    this._setDefaults();

    if (!id) {
      if (!this._deferredService.get()) {

        // Clear previous Article instance on service.
        this.article = new Article();
        this.snippetService.setSnippets([]);
      }

      return Promise.resolve(this.article as Article);
    } else {

      // Clear previous Article instance on service.
      this.article = new Article();
      this.snippetService.setSnippets([]);
      this._deferredService.reset();
    }

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {

      this.article = this.cacheService.getCache(cacheKey);
      this.snippetService.setSnippets(this.article.snippetsJson);

      return Promise.resolve(this.article as Article);
    }

    return this.apiService
      .get(url)
      .then(response => {

        // Set article on this service.
        this.article = response.json() as Article;
        this.snippetService.setSnippets(this.article.snippetsJson);

        // Add response to cache.
        this.cacheService.setCache(cacheKey, response.json() as Article);

        return this.article as Article;
      });
  }

  getArticles(page: number, pages?: boolean, cached?: boolean, parameters?: Object, query?: string): Promise<Article[]> {
    const amount = (parameters && parameters.hasOwnProperty('amount')) ? parameters['amount'] : config.paginationAmount;
    const tag = (parameters && parameters.hasOwnProperty('tag')) ? parameters['tag'] : null;
    const params = {
      admin_view: true
    };

    let url = `${this._articlesUrl}/site/${_rs.siteId}/` +
              `${(pages) ? 'flatpages/' : ''}${(tag) ? '/tag/' + tag + '/' : ''}${amount}/`;
    let cacheKey = (pages) ? 'pages' : 'articles';
    cacheKey = (page) ? `${cacheKey}_${page}` : `${cacheKey}_1`;

    // Toggle loading service
    this.loadingService.set(true);

    if (query) {
      params['q'] = query;
      cacheKey = `${cacheKey}_${query}`;

      if (pages) {
        url = this._pagesSearchUrl;
      } else {
        url = this._articlesSearchUrl;
      }
    }

    // Clear previous articles list.
    this[(pages) ? 'pages' : 'articles'] = []

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey) && cached) {
      const cachedData = this.cacheService.getCache(cacheKey);
      this[(pages) ? 'pages' : 'articles'] = cachedData.results as Article[];
      this.paginationService.setupPagination(cachedData.page, cachedData.numPages);

      // Toggle loading service
      this.loadingService.set(false);

      return Promise.resolve(cachedData.results as Article[]);
    }

    if (page) { params['page'] = page; }

    return this.apiService
      .get(url, params)
      .then(response => {
        const data = response.json();

        // Setup the pagination service.
        this.paginationService.setupPagination(data.page, data.numPages);

        // Set articles on this service.
        this[(pages) ? 'pages' : 'articles'] = data.results as Article[];

        // Add articles to cache.
        if (cached) {
          this.cacheService.setCache(cacheKey, data);
        }

        // Toggle loading service
        this.loadingService.set(false);

        return this[(pages) ? 'pages' : 'articles'];
      });
  }

  create(): Promise<Article> {
    const url = `${this._articlesUrl}/`;

    return this.apiService
      .put(url, this.article)
      .then(response => {
        const cacheKey = `article_${response.json().id}`;
        this.cacheService.setCache(cacheKey, response.json() as Article);

        // Add article to cached articles.
        this.cacheService.clearCache('articles');

        return response.json() as Article;
      });
  }

  update(): Promise<Article> {
    const url = `${this._articlesUrl}/${this.article.id}/`;
    const cacheKey =  (this.article.isFlatpage) ?
                      `pages_${this.paginationService.currentPage}` :
                      `articles_${this.paginationService.currentPage}`;

    return this.apiService
      .post(url, this.article)
      .then(response => {

        // Update article in cached articles.
        this.cacheService
          .updateObjectInCacheArray(cacheKey, this.article);
        this.cacheService
          .updateObject(`article_${this.article.id}`, this.article);

        this.article = response.json() as Article;

        // Update article in articles.
        this.articles[this.articles.findIndex(el => el.id === this.article.id)] = this.article;

        return response;
      })
  }

  updateDateTime(property: string, value: any) {
    const date = moment(value).format();
    this.updateProperty(property, date);
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

  toggleProperty(property: string, obj: object) {
    if (!this.article[property]) { this.article[property] = [] }

    // Toggle a property on the article.
    if (this.article[property].findIndex(el => el.id === obj['id']) !== -1) {
      this.article[property].splice([this.article[property].findIndex(el => el.id === obj['id'])], 1);
    } else {
      this.article[property].push(obj);
    }
  }

  pickArticle(): Promise<Article> {
    return this._ngZone.run(() => {
      this._router.navigate(['/cms/article-list/'], {queryParams: {selecting: true}})
      return this._deferredService.set();
    });
  }

  selectedArticle(article: Article): void {
    if (!this._deferredService.get()) { return; }

    this._deferredService.resolve(article);
    this._deferredService = new DeferredService();
    this._location.back();
  }

  private _setDefaults(): void {

    // Get categories, authors and feeds. Set the defaults for this article.
    this.categoryService.getCategories().then(_ => this._setDefault('category'));
    this.authorService.getAuthors().then(_ => this._setDefault('author'));
    this.feedService.getFeeds().then(_ => this._setDefault('RATable'));
    this.siteService.getSites().then(_ => this._setDefault('site'));
  }

  private _setDefault(property: string): void {
    switch (property) {
      case 'author':
        // A new article doesn't have a author by default. After we got
        // all the authors we set it to the site's default author.
        this.article[property] = this.authorService.authors
                                                  .find(a => a.slug === _rs.defaultAuthor);
        break;
      case 'category':
        // A new article doesn't have a category by default. After we got
        // all the categories we set it to the site's default category.
        this.article[property][0] = this.categoryService.categories
                                                  .find(c => c.slug === _rs.defaultCategory);
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
}
