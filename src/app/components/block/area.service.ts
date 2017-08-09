
import { Injectable } from '@angular/core';
import { Area } from './area';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';

declare var _rs: any;

@Injectable()
export class AreaService {
  public areas: Area[] = [];
  private _areaUrl = `modules/blocks/areas/site/${_rs.siteId}/?admin_view=true`;

  constructor(
    private _apiService: ApiService,
    private cacheService: CacheService) { }

  get(): Promise<Area[]> {
    const cacheKey = 'areas';

    if (this.cacheService.checkCacheKey(cacheKey)) {
      const cachedData = this.cacheService.getCache(cacheKey);
      return Promise.resolve(cachedData.results as Area[]);
    }

    return this._apiService
      .get(this._areaUrl)
      .then(response => {
        this.cacheService.setCache(cacheKey, response.json() as Area[]);
        this.areas = response.json() as Area[];

        return response.json();
      });
  }

}
