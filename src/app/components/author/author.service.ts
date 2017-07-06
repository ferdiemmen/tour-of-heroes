
import { Injectable } from '@angular/core';

import { User } from '../user/user';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class AuthorService {
  public authors: User[];

  private authorsUrl = 'api/authors'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getAuthor(id: number): Promise<User> {
    const url = `${this.authorsUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json().data as User);
  }

  getAuthors(): Promise<User[]> {
    const url = `${this.authorsUrl}`;
    const cacheKey = 'authors';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        this.authors = response.json().data as User[];
        this.cacheService.setCache('authors', this.authors);
        return this.authors;
      });
  }
}
