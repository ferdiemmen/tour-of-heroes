
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-pagebreak',
  template: `
    <medium-editor
      class="snippet snippet__pagebreak"
      [(editorModel)]="snippet.data['body']"
      [editorOptions]="{'disableReturn': true, 'toolbar': false}">
    </medium-editor>
  `,
})
export class SnippetPagebreakComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
