
import { Component, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';

import { GridService } from './grid.service';
import { GridElementService } from './grid-element.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  public selectableRange: Array<number> = new Array(450);

  constructor(
    public gridService: GridService,
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
    private _gridElementService: GridElementService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  save(cont?: boolean): void {
    let link;
    let action = (this.gridService.grid.id) ? 'update' : 'create';

    this.gridService[action]()
      .then(block => {
        if (cont) {
          link = ['/cms/grid/edit', block.id];
          action = 'update';
        } else {
          link = ['/cms/grid-list'];
        }
        this._router.navigate(link);
      });
  }

  destroy(): void {
    this.gridService.remove()
      .then(_ => this._router.navigate(['/cms/grid-list']));
  }

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => this.gridService.get(+params.get('id')))
      .subscribe();
  }

  ngAfterViewInit() {
    const _self = this;

    // Check if element existance in the DOM before turning it into a selectable.
    const elementCheck = setInterval(() => {

      if ($('.selectable', this._elementRef.nativeElement).length) {

        // Clear the interval.
        clearInterval(elementCheck);

        $('.selectable', _self._elementRef.nativeElement).selectable({
          stop: ( event ) => {
            const coordinates = [];

            $('.ui-selected', _self._elementRef.nativeElement).each((i, o) => {
              if (i === 0 || i === ($('.ui-selected', _self._elementRef.nativeElement).length - 1)) {
                const position = $(o).position();
                const c = {};
                c['top'] = position.top;
                c['left'] = position.left;
                coordinates.push(c);
              }
            }).promise().done(() => {

              _self._gridElementService.create(coordinates);
              $('.grid-selectable', _self._elementRef.nativeElement).removeClass('ui-selected');
            });

          }
        });
      }
    }, 100);
  }
}
