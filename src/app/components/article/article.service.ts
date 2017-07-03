
import { Injectable } from '@angular/core';

import { Article } from './article';
import { ApiService } from '../../api.service';


@Injectable()
export class ArticleService {
  article: Article;
  private articlesUrl = 'api/articles'; // URL to web api

  constructor(private apiService: ApiService) { }

  getArticle(id: number): Promise<Article> {
    const url = `${this.articlesUrl}/${id}/`;
    return this.apiService.get(url)
      .then(response => {
        return this.article = response.json().data as Article;
      })
  }
}
