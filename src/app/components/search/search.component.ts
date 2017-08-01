
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search',
  template: `
    <input type="text" [formControl]="searchControl" />
  `,
})
export class SearchComponent {
  public searchControl: FormControl = new FormControl();

  @Input('type') type: string;
  @Output() searched: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.searchControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this._search(value));
  }

  private _search(value: string) {
    this.searched.emit(value);
  }
}
