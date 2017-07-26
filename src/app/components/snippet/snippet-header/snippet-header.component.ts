
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-header',
  template: `
    <medium-editor
      class="snippet snippet__header"
      [(editorModel)]="snippet.data.body"
      [editorOptions]="{'disableReturn': true, 'toolbar': false}">
    </medium-editor>
  `,
})
export class SnippetHeaderComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
