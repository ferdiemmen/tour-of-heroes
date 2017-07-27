

import { Component, Input } from '@angular/core';
import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-pagination',
  template: `
    <ul>
      <li *ngFor="let page of service.pages">
        <a [routerLink]="[route]" [queryParams]="{ page: page }" [ngClass]="{active: page === service.currentPage }">{{page}}</a>
      </li>
    </ul>
  `,
})
export class PaginationComponent {

  @Input('route') route: string;
  @Input('service') service: PaginationService;

  constructor() { }

}
