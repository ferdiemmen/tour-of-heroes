
import { Injectable } from '@angular/core';

import { Article } from './article';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class ArticleService {

  private articlesUrl = 'api/articles'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getArticle(id: number): Promise<Article> {
    const url = `${this.articlesUrl}/${id}/`;
    const cacheKey = `article_${id}`;

    // Check if a cached version exist and return it.
    if (this.cacheService.getCache(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        // Add to response to the cache service.
        this.cacheService.setCache(cacheKey, response.json().data);

        return response.json().data as Article;
      });
  }

  getArticles(): Promise<Article[]> {
    const url = `${this.articlesUrl}`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Article[]);
  }

  create(article: Article): Promise<Article> {
    const url = `${this.articlesUrl}`;
    return this.apiService
      .post(url, article)
      .then(response => response.json().data as Article);
  }

  update(article: Article): Promise<Article> {
    const url = `${this.articlesUrl}/${article.id}/`;
    return this.apiService
      .put(url, article);
  }
}
