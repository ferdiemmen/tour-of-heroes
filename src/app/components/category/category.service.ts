
import { Injectable } from '@angular/core';

import { Category } from './category';
import { ApiService } from '../../api.service';


@Injectable()
export class CategoryService {
  public categories: Category[];

  private categoriesUrl = 'api/categories'; // URL to web api

  constructor(private apiService: ApiService) { }

  getCategory(id: number): Promise<Category> {
    const url = `${this.categoriesUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Category);
  }

  getCategories(): Promise<Category[]> {
    const url = `${this.categoriesUrl}`;
    return this.apiService
      .get(url)
      .then(response => this.categories = response.json().data as Category[]);
  }
}
