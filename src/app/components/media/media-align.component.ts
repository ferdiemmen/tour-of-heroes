

import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-media-align',
  templateUrl: './media-align.component.html',
  styleUrls: ['./media-align.component.scss'],
})
export class MediaAlignComponent {
  public position: string = 'center';

  @Output('changed') changed: EventEmitter<string> = new EventEmitter();

  constructor() { }

  changeAlignment(position: string): void {
    this.position = position;
    this.changed.emit(position);
  }

}
