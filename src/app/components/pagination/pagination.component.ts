

import { Component, Input } from '@angular/core';
import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-pagination',
  styleUrls: ['./pagination.component.scss'],
  template: `
    <div class="pagination">
      <ul>
        <li>
          <span class="pagination__item">
            {{service.totalPages}} totaal
          </span>
        </li>
        <li *ngFor="let page of service.pages">
          <a  class="pagination__item pagination__link"
              [routerLink]="[route]"
              [queryParams]="getQueryParameters(page)"
              *ngIf="page !== service.currentPage">{{page}}</a>
          <span class="pagination__item active" *ngIf="page === service.currentPage">{{page}}</span>
        </li>
      </ul>
    </div>
  `,
})
export class PaginationComponent {

  @Input('route') route: string;
  @Input('routeParams') routeParams: Object = {};
  @Input('service') service: PaginationService;

  constructor() { }

  getQueryParameters(page: number): Object {
    for (const key in this.routeParams) {
      if (this.routeParams.hasOwnProperty(key)) {
        if (!this.routeParams[key]) { delete this.routeParams[key]; }
      }
    }

    const queryParams: Object = Object.assign({}, this.routeParams, { page: page });
    return queryParams;
  }
}
