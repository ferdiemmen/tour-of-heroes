
import { Component, Input, OnInit } from '@angular/core';

import { Snippet } from '../snippet';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';


@Component({
  selector: 'app-snippet-image',
  styleUrls: ['./snippet-image.component.scss'],
  template: `
    <div name="media" class="snippet snippet__image" (click)="setMedia()">
      <app-media-resized
            [media]="media"
            width="640"></app-media-resized>
    </div>
  `,
})
export class SnippetImageComponent implements OnInit {
  media: Media;

  @Input('snippet') snippet: Snippet;

  constructor(private mediaService: MediaService) { }

  setMedia(): void {
    this.mediaService.pickMedia()
      .then(response => {
        this.snippet.data['mediaId'] = response.file['mediaId'];
        this.mediaService.getMedia(response.file['mediaId'])
          .then(res => this.media = res);
      }
    );
  }

  ngOnInit(): void {
    if (!this.snippet.data['mediaId']) { return; }

    this.mediaService.getMedia(this.snippet.data['mediaId'])
      .then(response => this.media = response);
  }
}
