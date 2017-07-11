
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

  @Input('media') media: Media;
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('crop') crop: string;

  url: string;

  constructor(public mediaService: MediaService) { }

  ngOnInit(): void {
    this.url = this.mediaService.getResizedImage(this.media, this.width, this.height, this.crop || 'center');
  }
}
