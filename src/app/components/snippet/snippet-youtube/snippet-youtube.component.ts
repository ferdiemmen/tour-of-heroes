
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';

'https://stackoverflow.com/questions/32051273/angular2-and-debounce'

@Component({
  selector: 'app-snippet-youtube',
  styleUrls: ['./snippet-youtube.component.scss'],
  template: `
    <div name="media" class="video-embed-container video-embed-container--16x9 snippet snippet__youtube cms__outline">
      <input [formControl]="urlController" />
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
export class SnippetYoutubeComponent implements OnInit {
  urlController: FormControl;
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.urlController = new FormControl();
    this.urlController.registerOnChange((event, foo, bar) => {
      console.log(event, foo, bar);
    })
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.snippet.data['body']);
  }

  updateUrl(value: string): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + value);
  }
}
