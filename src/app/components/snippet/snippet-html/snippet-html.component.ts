
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-html',
  template: `
    <textarea
      class="snippet snippet__html"
      rows="20"
      [(ngModel)]="snippet.data['body']"></textarea>
  `,
})
export class SnippetHtmlComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
