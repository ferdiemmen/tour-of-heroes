
import { Injectable } from '@angular/core';

import { Article } from './article';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class ArticleService {
  public article: Article = new Article();
  public articles: Article[] = [];

  private articlesUrl = 'api/articles'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getArticle(id: number): Promise<Article> {
    const url = `${this.articlesUrl}/${id}/`;
    const cacheKey = `article_${id}`;

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      this.article = this.cacheService.getCache(cacheKey);
    }

    return this.apiService
      .get(url)
      .then(response => {
        // Set article on this service.
        this.article = response.json().data as Article;

        // Add response to cache.
        this.cacheService.setCache(cacheKey, response.json().data as Article);

        return this.article;
      });
  }

  getArticles(): void {
    const url = `${this.articlesUrl}`;
    const cacheKey = 'articles';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      this.articles = this.cacheService.getCache(cacheKey) as Article[];
    }

    this.apiService
      .get(url)
      .then(response => {
        // Set articles on this service.
        this.articles = response.json().data as Article[];

        // Add articles to cache.
        this.cacheService.setCache(cacheKey, this.articles);

        return this.articles;
      });
  }

  create(): Promise<Article> {
    const url = `${this.articlesUrl}`;

    return this.apiService
      .post(url, this.article)
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
      .put(url, this.article)
      .then(response => {

        // Update article in cached articles.
        this.cacheService
          .updateObjectInCacheArray('articles', this.article);

        // Update article in articles.
        this.articles[this.articles.findIndex(el => el.id === this.article.id)] = this.article;

        return response;
      })
  }
}
