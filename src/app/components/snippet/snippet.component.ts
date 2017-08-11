
import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import * as $ from 'jquery';
import 'jqueryui';

import { Snippet } from './snippet';
import { SnippetService } from './snippet.service';


@Component({
  selector: 'app-snippets',
  template: `
    <ul class="snippets" [ngClass]="{'empty' : !snippets }">
      <li class="snippet" *ngFor="let snippet of snippets;let i = index" [id]="i">
        <div class="cms__outline" [ngSwitch]="snippet.type" [attr.data-type]="snippet.type|capitalize">
          <i class="fa fa-arrows handle" aria-hidden="true"></i>
          <i class="fa fa-trash-o" aria-hidden="true" (click)="removeSnippet(snippet)"></i>
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
          <app-snippet-html *ngSwitchCase="'html'" [snippet]="snippet"></app-snippet-html>
          <app-snippet-list *ngSwitchCase="'list'" [snippet]="snippet"></app-snippet-list>
          <app-snippet-container *ngSwitchCase="'snippetcontainer'" [snippet]="snippet" [snippetService]="snippetService"></app-snippet-container>
          <app-snippet-review *ngSwitchCase="'review'" [snippet]="snippet"></app-snippet-review>
          <app-snippet-kieskeurig *ngSwitchCase="'kieskeurig'" [snippet]="snippet"></app-snippet-kieskeurig>
        </div>
      </li>
    </ul>
  `,
})
export class SnippetsComponent implements AfterViewInit {
  trashbin: Object[] = [];

  @Input('snippets') snippets: Snippet[];
  @Input('snippetService') snippetService: SnippetService;

  constructor(
    private _hotkeysService: HotkeysService,
    private _elementRef: ElementRef) {

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

  removeSnippet(snippet: Snippet): void {
    this.trashbin.push({
      index: this.snippets.indexOf(snippet),
      snippet: snippet
    });
    this.snippets.splice(this.snippets.indexOf(snippet), 1);
  }

  ngAfterViewInit(): void {
    let previousIndex: number;
    let parentIndex;
    const _self = this;

    // Check if element existance in the DOM before turning it into a sortable.
    const elementCheck = setInterval(() => {

      if ($('> ul', this._elementRef.nativeElement).length) {

        // Clear the interval.
        clearInterval(elementCheck);

        $('> ul', this._elementRef.nativeElement).sortable({
          handle: '.handle',
          helper: 'original',
          placeholder: 'ui-state-highlight',
          forcePlaceholderSize: true,
          tolerance: 'pointer',
          start: ( event, ui ) => {
            previousIndex = ui.item.index();
          },
          stop: ( event, ui ) => {
            if (previousIndex === ui.item.index() || ui.item.index() === -1) { return; }

            const a = this.snippets[previousIndex];
            this.snippets.splice(previousIndex, 1);
            this.snippets.splice(ui.item.index(), 0, a);
          },
          receive: function( event, ui ) {
            if ($(this).closest('.snippet__container')) {
              parentIndex = $(this).closest('li.snippet').index();
            }

            const index = $('> ul', _self._elementRef.nativeElement).data('ui-sortable').currentItem.index();
            _self.snippetService.addSnippet($(ui.item).data('type'), parentIndex, index);

            $('.snippets .ui-draggable').remove();
          }
        });
      }
    }, 100);
  }
}
