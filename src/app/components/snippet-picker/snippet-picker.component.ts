
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet/snippet';


const defaults = {
  paragraph: {
    type: 'paragraph',
    data: {
      body: 'Leuk bericht'
    }
  },
  image: {
    type: 'image',
    data: {
      mediaId: 484506
    }
  }
}


@Component({
  selector: 'app-snippet-picker',
  // styleUrls: ['./toolbar.component.scss'],
  template: `
    <div class="snippet-picker">
      <ul>
        <li>
          <button type="button" (click)="addSnippet('paragraph')">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button type="button" (click)="addSnippet('image')">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </div>
  `
})
export class SnippetPickerComponent {

  @Input('snippets') snippets: Snippet[];

  addSnippet(type: string): void {
    this.snippets.push(new Snippet(defaults[type]));
  }
}


