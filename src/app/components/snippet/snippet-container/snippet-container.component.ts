
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-container',
  styleUrls: ['./snippet-container.component.scss'],
  template: `
    <div class="snippet snippet__container">
      <app-snippets [snippets]="snippet.data['subSnippets']"></app-snippets>
    </div>
  `,
})
export class SnippetContainerComponent {

  @Input('snippet') snippet: Snippet;

  constructor() { }

}
