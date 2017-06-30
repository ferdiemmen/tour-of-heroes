import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  cache: Object = {};

  setCache(id: any, objects: any): void {
    this.cache[id] = objects;
  }

  getCache(id: any): any {
    if (!this.cache[id]) { return false }
    return Promise.resolve(this.cache[id]);
  }
}
