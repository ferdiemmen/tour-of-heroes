
import { Component, Input, OnInit } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-paragraph',
  template: `
    <medium-editor
      class="snippet snippet__paragraph cms__outline"
      [(editorModel)]="snippet.data.body"
      [editorOptions]="{'disableReturn': true, 'toolbar': false}">
    </medium-editor>
  `,
})
export class SnippetParagraphComponent implements OnInit {

  @Input('snippet') snippet: Snippet;

  constructor() { }

  ngOnInit(): void {
    if (!this.snippet.data['body']) { return; }
  }

}