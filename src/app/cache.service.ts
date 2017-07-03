
import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private cache: Object = {};

  setCache(id: any, objects: any): void {
    this.cache[id] = objects;
  }

  getCache(id: any): any {
    if (!this.cache[id]) { return false }
    return Promise.resolve(this.cache[id]);
  }

  addToCacheArray(id: any, object: any): void {
    this.cache[id].push(object);
  }

  clearFromCacheArray(id: any, object: any): void {
    this.cache[id] = this.cache[id].filter(o => o !== object);
  }

  clearCache(id: any): void {
    delete this.cache[id];
  }
}
