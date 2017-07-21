
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

// https://stackoverflow.com/questions/32051273/angular2-and-debounce
import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';

declare var twttr: any;


@Component({
  selector: 'app-snippet-twitter',
  styleUrls: ['./snippet-twitter.component.scss'],
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div class="snippet snippet__twitter">
      <div class="snippet-edit" *ngIf="edit">
        <input [value]="snippet.data.body" [formControl]="tweetControl" />
        <button type="button" (click)="edit = !edit">Aanpassen</button>
      </div>
      <div class="twitter-media"></div>
    </div>
  `,
})
export class SnippetTwitterComponent implements OnInit {
  tweetControl: FormControl = new FormControl();

  @Input('snippet') snippet: Snippet;

  constructor(
    private elementRef: ElementRef) {
    this.tweetControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.updateUrl(value));
  }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }

    this.updateUrl(this.snippet.data['body']);
  }

  updateUrl(value: string): void {

    this.elementRef.nativeElement.getElementsByClassName('twitter-media')[0].innerHTML = '';

    twttr.widgets.createTweet(
      value,
      this.elementRef.nativeElement.getElementsByClassName('twitter-media')[0]
    );

    this.snippet.data['body'] = value;
  }
}
