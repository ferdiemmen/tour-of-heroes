
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-quote',
  template: `
    <medium-editor
      class="snippet snippet__quote"
      [(editorModel)]="snippet.data.body"
      [editorOptions]="{'disableReturn': true, 'toolbar': false}">
    </medium-editor>
  `,
})
export class SnippetQuoteComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
