
import { Injectable } from '@angular/core';

import { Category } from './category';
import { ApiService } from '../../api.service';


@Injectable()
export class CategoryService {

  private articlesUrl = 'api/articles'; // URL to web api

  constructor(private apiService: ApiService) { }

  getCategory(id: number): Promise<Category> {
    const url = `${this.articlesUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Category);
  }

  getCategories(): Promise<Category[]> {
    const url = `${this.articlesUrl}`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Category[]);
  }
}
