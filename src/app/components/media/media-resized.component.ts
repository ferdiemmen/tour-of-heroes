
import { Component, Input, OnInit } from '@angular/core';

import { Media } from './media';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media-resized',
  template: `
    <img src="{{url}}" />
  `,
  styleUrls: ['./media-resized.component.scss']
})
export class MediaResizedComponent implements OnInit {
  public url: string;
  private _media: Media;

  @Input('width') width: number;
  @Input('height') height: number;
  @Input('crop') crop: string;

  constructor(public mediaService: MediaService) { }

  ngOnInit(): void {
    if (!this._media) { return; }
    this.url = this.mediaService.getResizedImage(this._media, this.width, this.height, this.crop || 'center');
  }


  @Input('media') set media(value: Media) {
    this._media = value as Media;
    if (this._media) {
      this.url = this.mediaService.getResizedImage(this._media, this.width, this.height, this.crop || 'center');
    }
  }

  get media(): Media {
    return this._media as Media;
  }

}
