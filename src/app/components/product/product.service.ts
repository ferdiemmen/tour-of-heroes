
import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

import { Master } from './master';
import { PaginationService } from '../pagination/pagination.service';
import { LoadingService } from '../../loading.service';


@Injectable()
export class ProductService {
  public masters: Master[] = [];
  public paginationService: PaginationService;
  public loadingService: LoadingService;
  private _mastersSearchUrl = 'modules/search/masters/'; // URL to search web api

  constructor(private _apiService: ApiService) {
    this.paginationService = new PaginationService();
    this.loadingService = new LoadingService();
  }

  public getMasters(page: number, query?: string): Promise<Master[]> {
    let url = this._mastersSearchUrl;

    if (page) {
      url = `${this._mastersSearchUrl}?page=${page}`;
    }

    if (query) {
      url = `${this._mastersSearchUrl}?q=${query}`;
    }

    // Toggle loading service
    this.loadingService.set(true);

    return this._apiService.get(url)
      .then(response => {

        // Toggle loading service
        this.loadingService.set(false);

        // Setup the pagination service.
        this.paginationService.setupPagination(response.json().page, response.json().numPages);

        return this.masters = response.json().results as Master[]
      });
  }

}
