
import { Component, Input, OnInit } from '@angular/core';

import { Snippet } from '../snippet';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';


@Component({
  selector: 'app-snippet-paragraph',
  template: `
    <medium-editor class="snippet snippet__paragraph cms__outline" [(editorModel)]="snippet.data.body"
      [editorOptions]="{}">
    </medium-editor>
  `,
})
export class SnippetParagraphComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
