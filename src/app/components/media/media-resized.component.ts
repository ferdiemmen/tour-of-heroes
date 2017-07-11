
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
  private _media: Media;

  @Input('width') width: number;
  @Input('height') height: number;
  @Input('crop') crop: string;

  url: string;

  @Input('media')
  set media(media: Media) {
    console.log('prev value: ', this._media);
    console.log('got media: ', media);
    this._media = media;
  }

  constructor(public mediaService: MediaService) { }

  ngOnInit(): void {
    this.url = this.mediaService.getResizedImage(this._media, this.width, this.height, this.crop || 'center');
  }

  // get media(): Media {
  //   return this._media;
  // }
  
}
