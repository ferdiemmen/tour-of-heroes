
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <a routerLink="/article/create">
        <i class="fa fa-file-text-o"></i>
        Maak een artikel aan
      </a>
      <a routerLink="/page/create">
        Maak pagina aan
      </a>
    </div>
  `
})
export class DashboardComponent { }
