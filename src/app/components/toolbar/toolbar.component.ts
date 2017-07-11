
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


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
        </ul>
      </div>

      <a class="cms-toolbar__link" routerLink="/cms/article-list">
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
      </a>
      
      <a class="cms-toolbar__link" routerLink="/cms/page-list">
        <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
      </a>

      <a class="cms-toolbar__link" [routerLink]="['/cms/media-list', {type: 'images'}]">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
      </a>
    </div>
  `
})
export class ToolbarComponent { }
