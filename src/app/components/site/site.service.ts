
import { Injectable } from '@angular/core';

import { Site } from './site';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class SiteService {
  public sites: Site[];

  private sitesUrl = 'modules/base/sites/'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getSite(id: number): Promise<Site> {
    const url = `${this.sitesUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => response.json() as Site);
  }

  getSites(): Promise<Site[]> {
    const url = `${this.sitesUrl}`;
    const cacheKey = 'sites';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        this.sites = response.json() as Site[];
        this.cacheService.setCache('sites', this.sites);
        return this.sites;
      });
  }
}
