
import { Component, OnInit } from '@angular/core';

import { AreaService } from './area.service';


@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit {

  constructor(
    public areaService: AreaService) { }

  ngOnInit() {
    this.areaService.get();
  }
}
