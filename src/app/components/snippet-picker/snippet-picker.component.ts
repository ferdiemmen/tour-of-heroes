
import { Component, Input } from '@angular/core';

import { Snippet } from '../snippet/snippet';


const defaults = {
  paragraph: {
    type: 'paragraph',
    data: {
      body: ''
    }
  },
  header: {
    type: 'header',
    data: {
      body: ''
    }
  },
  image: {
    type: 'image',
    data: {}
  },
  youtube: {
    type: 'youtube',
    data: {
      body: '3jWRrafhO7M'
    }
  },
  instagram: {
    type: 'instagram',
    data: {
      body: '8Qk4RJrDcV'
    }
  }
}


@Component({
  selector: 'app-snippet-picker',
  styleUrls: ['./snippet-picker.component.scss'],
  template: `
    <ul class="snippet-picker">
      <li>
        <button type="button" (click)="addSnippet('paragraph')">
          <i class="fa fa-paragraph" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('header')">
          <i class="fa fa-header" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('image')">
          <i class="fa fa-picture-o" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('youtube')">
          <i class="fa fa-youtube-play" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('instagram')">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  `
})
export class SnippetPickerComponent {

  @Input('snippets') snippets: Snippet[];

  addSnippet(type: string): void {
    this.snippets.push(new Snippet(defaults[type]));
  }
}


