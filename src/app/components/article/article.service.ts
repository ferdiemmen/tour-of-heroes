
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
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        const article = response.json().data as Article;
        
        // Add response to cache.
        this.cacheService.setCache(cacheKey, article);

        return article;
      });
  }

  getArticles(): Promise<Article[]> {
    const url = `${this.articlesUrl}`;
    const cacheKey = 'articles';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }
    
    return this.apiService
      .get(url)
      .then(response => {
        const articles = response.json().data as Article[];

        // Add articles to cache.
        this.cacheService.setCache(cacheKey, articles);

        return articles;
      });
  }

  create(article: Article): Promise<Article> {
    const url = `${this.articlesUrl}`;
    
    return this.apiService
      .post(url, article)
      .then(response => {
        const article = response.json().data as Article;

        // Add article to cached articles.
        this.cacheService
          .addToCacheArray('articles', article);
        
        return article;
      });
  }

  update(article: Article): Promise<Article> {
    const url = `${this.articlesUrl}/${article.id}/`;
    return this.apiService
      .put(url, article)
      .then(response => {

        // Update article in cached articles.
        this.cacheService
          .updateObjectInCacheArray('articles', article);

        return response;
      })
  }
}
