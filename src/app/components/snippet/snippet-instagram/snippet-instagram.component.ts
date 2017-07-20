
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

// https://stackoverflow.com/questions/32051273/angular2-and-debounce
import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';

declare var instgrm: any;


@Component({
  selector: 'app-snippet-instagram',
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div
      name="media"
      class="video-embed-container video-embed-container--16x9 snippet snippet__instagram">
      <div class="snippet-edit" *ngIf="edit">
        <input [value]="snippet.data.body" [formControl]="urlControl" />
        <button type="button" (click)="edit = !edit">Aanpassen</button>
      </div>
      <div class="instagram-media"></div>
    </div>
  `,
})
export class SnippetInstagramComponent implements OnInit {
  urlControl: FormControl = new FormControl();
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private jsonp: Jsonp,
    private http: Http) {
    this.urlControl.valueChanges
      .debounceTime(300)
      .subscribe(value => this.updateUrl(value));
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.updateUrl(this.snippet.data['body']);
  }

  updateUrl(value: string): void {
    const url = 'https://api.instagram.com/oembed/?url=http://instagr.am/p/' +
            value +
            '/&callback=JSONP_CALLBACK&omitscript=true';

    this.jsonp
      .request(url)
      .toPromise()
      .catch(err => {
        console.log(err);
      })
      .then(response => {
        if (!response) { return; }
        this.elementRef.nativeElement.getElementsByClassName('instagram-media')[0].innerHTML = response.json().html;
        instgrm.Embeds.process();
      });

    this.snippet.data['body'] = value;
  }
}
