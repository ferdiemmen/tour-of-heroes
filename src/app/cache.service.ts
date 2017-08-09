
import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private cache: Object = {};

  setCache(id: any, objects: any): void {
    this.cache[id] = objects;
  }

  getCache(id: any): any {
    if (!this.cache[id]) { return false }
    return this.cache[id];
  }

  checkCacheKey(id: string): boolean {
    if (this.cache.hasOwnProperty(id)) { return true };
    return false;
  }

  addToCacheArray(id: any, object: any): void {
    if (!this.cache.hasOwnProperty(id)) { return; }
    this.cache[id].unshift(object);
  }

  updateObjectInCacheArray(id, object): void {
    if (!this.cache.hasOwnProperty(id)) { return; }
    if (this.cache[id].results.findIndex(el => el.id === object.id) !== -1) {
      this.cache[id][this.cache[id].results.findIndex(el => el.id === object.id)] = object;
    }
  }

  updateObject(id, object): void {
    if (!this.cache.hasOwnProperty(id)) { return; }
    this.cache[id] = object;
  }

  clearFromCacheArray(id: any, object: any): void {
    if (!this.cache.hasOwnProperty(id)) { return; }
    this.cache[id] = this.cache[id].filter(o => o !== object);
  }

  clearCache(id: any): void {
    if (!this.cache.hasOwnProperty(id)) { return; }
    delete this.cache[id];
  }
}
