

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
              [queryParams]="{ page: page }"
              *ngIf="page !== service.currentPage">{{page}}</a>
          <span class="pagination__item active" *ngIf="page === service.currentPage">{{page}}</span>
        </li>
      </ul>
    </div>
  `,
})
export class PaginationComponent {

  @Input('route') route: string;
  @Input('service') service: PaginationService;

  constructor() { }

}
