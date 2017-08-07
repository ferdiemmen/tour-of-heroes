
import { Injectable } from '@angular/core';
import { Area } from './area';
import { ApiService } from '../../api.service';

declare var _rs: any;

@Injectable()
export class AreaService {
  public areas: Area[];
  private _areaUrl = `modules/blocks/areas/site/${_rs.siteId}/?admin_view=true`;

  constructor(private _apiService: ApiService) { }

  get(): Promise<Area[]> {
    return this._apiService
      .get(this._areaUrl)
      .then(response => this.areas = response.json());
  }

}
