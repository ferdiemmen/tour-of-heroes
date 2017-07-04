
import { Injectable } from '@angular/core';

import { Article } from './article';
import { ApiService } from '../../api.service';


@Injectable()
export class ArticleService {

  private articlesUrl = 'api/articles'; // URL to web api

  constructor(private apiService: ApiService) { }

  getArticle(id: number): Promise<Article> {
    const url = `${this.articlesUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Article);
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
