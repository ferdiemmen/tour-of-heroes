
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { GridService } from './grid.service';


@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  public remove: boolean = false;

  constructor(
    public gridService: GridService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.gridService.getGrids(+params['page']))
      .subscribe();
  }

}
