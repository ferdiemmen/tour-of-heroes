
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { ApiService } from '../../api.service';
import { LoadingService } from '../../loading.service';
import { DeferredService } from '../deferred/deferred.service';
import { PaginationService } from '../pagination/pagination.service';
import { Grid } from './grid';
import { GridElement } from './grid-element';

declare var _rs: any;

@Injectable()
export class GridService {
  public grid: Grid = new Grid();
  public grids: Grid[] = [];
  public paginationService: PaginationService;
  public loadingService: LoadingService;

  private _gridUrl: string = `modules/featured_grids/`;

  constructor(
    private _apiService: ApiService,
    private _deferredService: DeferredService) {
      this.paginationService = new PaginationService();
      this.loadingService = new LoadingService();
  }

  get(id: number): Promise<Grid> {
    const url: string = `${this._gridUrl}${id}/`;

    if (!id) {
      if (!this._deferredService.get()) {
        // Clear previous Grid instance on service.
        this.grid = new Grid();
      }

      return Promise.resolve(this.grid);
    } else {

      // Clear previous Grid instance on service.
      this.grid = new Grid();
    }

    return this._apiService.get(url)
      .then(response => this.grid = new Grid(response.json()));
  }

  getGrids(page?: number): Promise<Grid[]> {
    const url: string = `${this._gridUrl}site/${_rs.siteId}/`;
    const params: Object = {};

    this.loadingService.set(true);

    if (page) { params['page'] = page; }

    return this._apiService.get(url, params)
      .then(response => {

        this.paginationService.setupPagination(response.json().page, response.json().numPages);

        this.loadingService.set(false);

        return this.grids = response.json().results as Grid[]
      });
  }

  addElement(element: GridElement) {
    this.grid.elements.push(element);
  }

  remove(): Promise<void> {
    const url = `${this._gridUrl}${this.grid.id}/`;

    return this._apiService
      .destroy(url);
  }

  updateDateTime(property: string, value: any) {
    const date = moment(value).format();
    this.updateProperty(property, date);
  }

  updateProperty(property: string, value: any) {
    this.grid[property] = value;
  }
}
