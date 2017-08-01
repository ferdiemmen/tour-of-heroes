
import { Component, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import * as $ from 'jquery';
import 'jqueryui';
import 'blueimp-file-upload/js/jquery.fileupload';

import 'rxjs/add/operator/switchMap';

import { Media } from './media';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent implements OnInit, AfterViewInit {
  query: string;

  constructor(
    public mediaService: MediaService,
    private _elementRef: ElementRef,
    private _router: Router,
    private route: ActivatedRoute) { }

  redirectToSearch(query: string) {
    this.query = query;
    this._router.navigate(['/cms/media-list/'], { queryParams: { type: 'images', q: query } });
  }

  ngOnInit(): void {

    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.mediaService.getMediaObjects((params['type']) ? params['type'] : 'images', params['page'], params['q']))
      .subscribe();
  }

  ngAfterViewInit(): void {
    const fileupload = $('#fileupload').fileupload({
      dataType: 'json',
      dropZone: void 0, // defaults to $(document)
      autoUpload: true,
      multiple: true,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
    });

    fileupload
      .bind('fileuploadadd', (e, data) => {
        this.mediaService.upload(data);
      }
    );
  }
}
