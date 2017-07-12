
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Media } from './media';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  // styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  constructor(
    public mediaService: MediaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route
      .paramMap
      .switchMap((params: ParamMap) => this.mediaService.getMediaObjects(params.get('type')))
      .subscribe();
  }
}