
import { Injectable } from '@angular/core';

import { Category } from './category';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class CategoryService {
  public categories: Category[];

  private categoriesUrl = 'api/categories'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getCategory(id: number): Promise<Category> {
    const url = `${this.categoriesUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as Category);
  }

  getCategories(): Promise<Category[]> {
    const url = `${this.categoriesUrl}`;
    const cacheKey = 'categories';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        this.categories = response.json().data as Category[];
        this.cacheService.setCache('categories', this.categories);
        return this.categories;
      });
  }
}
