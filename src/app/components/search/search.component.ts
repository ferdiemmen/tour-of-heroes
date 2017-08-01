
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-search',
  template: `
    <input type="text" [value]="query" [formControl]="searchControl" />
  `,
})
export class SearchComponent implements OnInit {
  public query: string;
  public searchControl: FormControl = new FormControl();

  @Input('type') type: string;
  @Output() searched: EventEmitter<any> = new EventEmitter();

  constructor(private _route: ActivatedRoute) {
    this.searchControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this._search(value));
  }

  private _search(value: string) {
    this.searched.emit(value);
  }

  ngOnInit(): void {
    this._route
        .queryParams
        .switchMap((params: ParamMap) => this.query = (params['q']) ? params['q'] : [])
        .subscribe();
  }
}
