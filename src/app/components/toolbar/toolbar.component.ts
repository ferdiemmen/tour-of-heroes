
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.scss'],
  template: `
    <div class="cms-toolbar">
      <ul>
        <li>
          <a routerLink="/articlebrowser">icon</a>
        </li>
      </ul>
    </div>
  `
})
export class ToolbarComponent { }
