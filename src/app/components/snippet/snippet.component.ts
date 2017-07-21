
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
    <ul id="snippets">
      <li class="snippet" *ngFor="let snippet of snippets;trackBy: trackByFn">
        <i class="fa fa-arrows handle" aria-hidden="true"></i>
        <i class="fa fa-trash-o" aria-hidden="true" (click)="removeSnippet(snippet)"></i>

        <app-snippet-paragraph *ngIf="snippet.type === 'paragraph'" [snippet]="snippet"></app-snippet-paragraph>
        <app-snippet-header *ngIf="snippet.type === 'header'" [snippet]="snippet"></app-snippet-header>
        <app-snippet-quote *ngIf="snippet.type === 'quote'" [snippet]="snippet"></app-snippet-quote>
        <app-snippet-image *ngIf="snippet.type === 'image'" [snippet]="snippet"></app-snippet-image>
        <app-snippet-iframe *ngIf="snippet.type === 'iframe'" [snippet]="snippet"></app-snippet-iframe>
        <app-snippet-youtube *ngIf="snippet.type === 'youtube'" [snippet]="snippet"></app-snippet-youtube>
        <app-snippet-instagram *ngIf="snippet.type === 'instagram'" [snippet]="snippet"></app-snippet-instagram>
        <app-snippet-twitter *ngIf="snippet.type === 'twitter'" [snippet]="snippet"></app-snippet-twitter>
        <app-snippet-twitch *ngIf="snippet.type === 'twitch'" [snippet]="snippet"></app-snippet-twitch>
        <app-snippet-pagebreak *ngIf="snippet.type === 'pagebreak'" [snippet]="snippet"></app-snippet-pagebreak>
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

  trackByFn(index: string, snippet: Snippet): string {
    return snippet ? snippet.id : index;
  }
}
