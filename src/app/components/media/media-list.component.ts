
import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Media } from './media';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  constructor(
    public mediaService: MediaService,
    private _elementRef: ElementRef,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.mediaService.getMediaObjects((params['type']) ? params['type'] : 'images', params['page']))
      .subscribe();
  }
}
