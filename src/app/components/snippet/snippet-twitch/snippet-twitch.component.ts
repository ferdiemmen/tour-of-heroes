
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-twitch',
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div class="video-embed-container video-embed-container--16x9 snippet snippet__twitch">
      <div class="snippet-edit" *ngIf="edit">
        <input [value]="snippet.data['body']" [formControl]="urlControl" />
        <button type="button" (click)="edit = !edit">Aanpassen</button>
      </div>
      <iframe
        width="640"
        height="360"
        [src]="url"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `,
})
export class SnippetTwitchComponent implements OnInit {
  edit: boolean = false;
  urlControl: FormControl = new FormControl();
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.urlControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.updateUrl(value));
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.updateUrl(this.snippet.data['body']);
  }

  updateUrl(value: string): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + value);
    this.snippet.data['body'] = value;
  }
}
