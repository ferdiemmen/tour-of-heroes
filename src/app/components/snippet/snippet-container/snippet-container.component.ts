
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';


@Component({
  selector: 'app-snippet-container',
  styleUrls: ['./snippet-container.component.scss'],
  template: `
    <div class="snippet snippet__container">
      <app-snippets [snippets]="snippet.data['subSnippets']" [snippetService]="snippetService"></app-snippets>
    </div>
  `,
})
export class SnippetContainerComponent {

  @Input('snippet') snippet: Snippet;
  @Input('snippetService') snippetService: SnippetService;

  constructor() { }

}
