
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { BlockService } from './block.service';
import { AreaService } from './area.service';


@Component({
  selector: 'app-block',
  templateUrl: './block.component.html'
})
export class BlockComponent implements OnInit {

  constructor(
    public areaService: AreaService,
    public blockService: BlockService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  save(cont?: boolean): void {
    let link;
    let action = (this.blockService.block.id) ? 'update' : 'create';

    this.blockService[action]()
      .then(block => {
        if (action === 'create' || cont) {
          link = ['/cms/block/edit', block.id];
          action = 'update';
        } else {
          link = ['/cms/block-list'];
        }
        this._router.navigate(link);
      });
  }

  ngOnInit() {
    this.areaService.get();

    this._route.paramMap
      .switchMap((params: ParamMap) => this.blockService.getBlock(+params.get('id')))
      .subscribe();
  }
}
