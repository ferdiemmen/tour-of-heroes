
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.scss'],
  template: `
    <div class="cms-toolbar cms-toolbar--left">
      <a class="cms-toolbar__link" routerLink="/cms/dashboard">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>

      <div class="has-dropdown cms-toolbar__link">
        <i class="fa fa-plus" aria-hidden="true"></i>
        <ul class="dropdown">
          <li class="dropdown__item"><a class="cms-toolbar__link" routerLink="/cms/article/create">Artikel</a></li>
          <li class="dropdown__item"><a class="cms-toolbar__link" routerLink="/cms/page/create">Pagina</a></li>
          <li class="dropdown__item"><a class="cms-toolbar__link" routerLink="/cms/block/create">Blok</a></li>
        </ul>
      </div>

      <a class="cms-toolbar__link" routerLink="/cms/article-list" data-tooltip="Artikelen">
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link" routerLink="/cms/page-list" data-tooltip="Pagina's">
        <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link" [routerLink]="['/cms/media-list']" [queryParams]="{ type: 'images' }" data-tooltip="Media">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link" routerLink="/cms/block-list" data-tooltip="Blokken">
        <i class="fa fa-th-list" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link" routerLink="/cms/product-list" data-tooltip="Producten">
        <i class="fa fa-gamepad" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link last" (click)="userService.logout()" *ngIf="userService.authenticated">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
  `
})
export class ToolbarComponent {

  constructor(public userService: UserService) { }
}
