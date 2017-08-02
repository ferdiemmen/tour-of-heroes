
import { Component, Input, OnInit } from '@angular/core';

import { Media } from './media';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media-resized',
  template: `
    <img class="b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="{{url}}" [ngClass]="{noimage : !url}" />
  `,
  styleUrls: ['./media-resized.component.scss']
})
export class MediaResizedComponent implements OnInit {
  public url: string;
  private _media: Media;
  private _crop: string;

  @Input('width') width: number;
  @Input('height') height: number;

  constructor(public mediaService: MediaService) { }

  ngOnInit(): void {
    if (!this._media) { return; }
    this._setUrl();
  }

  @Input('media') set media(value: Media) {
    if (!value) { return; }

    this._media = value as Media;
    this._setUrl();
  }

  get media(): Media {
    return this._media as Media;
  }

  @Input('crop') set crop(value: string) {
    if (!this._media) { return; }

    this._crop = value;
    this._setUrl();
  }

  get crop(): string {
    return this._crop;
  }

  protected _setUrl() {
    this.url = this.mediaService.getResizedImage(this._media, this.width, this.height, this._crop || 'center');
  }

}
