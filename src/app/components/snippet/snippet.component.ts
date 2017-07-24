
import { Component, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { SnippetParagraphComponent } from './snippet-paragraph/snippet-paragraph.component';
import { Snippet } from './snippet';


@Component({
  selector: 'app-snippets',
  entryComponents: [
    SnippetParagraphComponent
  ],
  template: `
    <ul id="snippets" [ngClass]="{'empty' : !snippets.length}">
      <li class="snippet" *ngFor="let snippet of snippets">
        <i class="fa fa-arrows handle" aria-hidden="true"></i>
        <i class="fa fa-trash-o" aria-hidden="true" (click)="removeSnippet(snippet)"></i>
        <div [ngSwitch]="snippet.type">
          <app-snippet-paragraph *ngSwitchCase="'paragraph'" [snippet]="snippet"></app-snippet-paragraph>
          <app-snippet-header *ngSwitchCase="'header'" [snippet]="snippet"></app-snippet-header>
          <app-snippet-quote *ngSwitchCase="'quote'" [snippet]="snippet"></app-snippet-quote>
          <app-snippet-image *ngSwitchCase="'image'" [snippet]="snippet"></app-snippet-image>
          <app-snippet-iframe *ngSwitchCase="'iframe'" [snippet]="snippet"></app-snippet-iframe>
          <app-snippet-youtube *ngSwitchCase="'youtube'" [snippet]="snippet"></app-snippet-youtube>
          <app-snippet-instagram *ngSwitchCase="'instagram'" [snippet]="snippet"></app-snippet-instagram>
          <app-snippet-twitter *ngSwitchCase="'twitter'" [snippet]="snippet"></app-snippet-twitter>
          <app-snippet-twitch *ngSwitchCase="'twitch'" [snippet]="snippet"></app-snippet-twitch>
          <app-snippet-pagebreak *ngSwitchCase="'pagebreak'" [snippet]="snippet"></app-snippet-pagebreak>
        </div>
      </li>
    </ul>
  `,
})
export class SnippetsComponent implements OnInit {
  trashbin: Object[] = [];

  @Input('snippets') snippets: Snippet[];

  constructor(private _hotkeysService: HotkeysService) {
    this._hotkeysService.add(new Hotkey(['ctrl+z', 'command+z'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
      if (!this.trashbin.length) { return event; }

      // Put snippet back to snippets array.
      const obj = this.trashbin[this.trashbin.length - 1]
      this.snippets.splice(obj['index'], 0, obj['snippet']);

      // Remove snippet from trashbin.
      this.trashbin.splice(this.trashbin.indexOf(obj), 1);

      event.returnValue = false; // Prevent bubbling
      return event;
    }));
  }

  ngOnInit(): void {
    if (!this.snippets.length) { return; }
  }

  removeSnippet(snippet: Snippet): void {
    this.trashbin.push({
      index: this.snippets.indexOf(snippet),
      snippet: snippet
    });
    this.snippets.splice(this.snippets.indexOf(snippet), 1);
  }
}
