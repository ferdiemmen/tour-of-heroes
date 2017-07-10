
import { Injectable } from '@angular/core';

import { Feed } from './feed';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class FeedService {
  public feeds: Feed[];

  private feedsUrl = 'feeds/site/2/'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getFeed(id: number): Promise<Feed> {
    const url = `${this.feedsUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json() as Feed);
  }

  getFeeds(): Promise<Feed[]> {
    const url = `${this.feedsUrl}`;
    const cacheKey = 'feeds';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        this.feeds = response.json() as Feed[];
        this.cacheService.setCache(cacheKey, this.feeds);
        return this.feeds;
      });
  }
}
