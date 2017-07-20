
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-youtube',
  styleUrls: ['./snippet-youtube.component.scss'],
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div
      name="media"
      class="video-embed-container video-embed-container--16x9 snippet snippet__youtube">
      <div class="snippet-edit" *ngIf="edit">
        <input [value]="snippet.data.body" [formControl]="urlControl" />
        <button type="button" (click)="edit = !edit">Aanpassen</button>
      </div>
      <iframe
        class="cms__outline"
        width="640"
        height="360"
        [src]="url"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `,
})
export class SnippetYoutubeComponent implements OnInit {
  urlControl: FormControl = new FormControl();
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.urlControl.valueChanges
      .debounceTime(300)
      .subscribe(value => this.updateUrl(value));
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.updateUrl(this.snippet.data['body']);
  }

  updateUrl(value: string): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + value);
    this.snippet.data['body'] = value;
  }
}
