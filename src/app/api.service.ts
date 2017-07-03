
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { CacheService } from './cache.service';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private cacheService: CacheService) { }

  get(url: string): Promise<any> {
    // Check if a cached version exist and return it.
    if (this.cacheService.getCache(url)) {
      return Promise.resolve(this.cacheService.getCache(url));
    }

    return this.http.get(url)
      .toPromise()
      .then(response => {
        // Add to response to the cache service.
        this.cacheService.setCache(url, response);
        return response;
      });
  }
}
