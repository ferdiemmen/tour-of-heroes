
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-iframe',
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div class="video-embed-container video-embed-container--16x9 snippet snippet__iframe">
      <div class="snippet-edit" *ngIf="edit">
        <input [value]="snippet.data.body" [formControl]="urlControl" />
        <input [value]="snippet.data.height" [formControl]="heightControl" />
        <button type="button" (click)="edit = !edit">Aanpassen</button>
      </div>
      <iframe
        width="640"
        [height]="snippet.data.height"
        [src]="url"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `,
})
export class SnippetIframeComponent implements OnInit {
  urlControl: FormControl = new FormControl();
  heightControl: FormControl = new FormControl();
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.urlControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.updateUrl(value));

    this.heightControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.snippet['height'] = value);
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.updateUrl(this.snippet.data['body']);
  }

  updateUrl(value: string): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    this.snippet.data['body'] = value;
  }
}
