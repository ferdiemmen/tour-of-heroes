
import { Component, Input } from '@angular/core';
import * as $ from 'jquery';

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
  quote: {
    type: 'quote',
    data: {
      body: ''
    }
  },
  image: {
    type: 'image',
    data: {}
  },
  iframe: {
    type: 'iframe',
    data: {
      body: '',
      height: 360
    }
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
  },
  twitter: {
    type: 'twitter',
    data: {
      body: '51434244341383168'
    }
  },
  twitch: {
    type: 'twitch',
    data: {
      body: 'officialgamernl'
    }
  },
  pagebreak: {
    type: 'pagebreak',
    data: {
      body: ''
    }
  },
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
        <button type="button" (click)="addSnippet('quote')">
          <i class="fa fa-quote-right" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('image')">
          <i class="fa fa-picture-o" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('iframe')">
          <i class="fa fa-code" aria-hidden="true"></i>
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
      <li>
        <button type="button" (click)="addSnippet('twitter')">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('twitch')">
          <i class="fa fa-twitch" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button type="button" (click)="addSnippet('pagebreak')">
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  `
})
export class SnippetPickerComponent {

  @Input('snippets') snippets: Snippet[];

  addSnippet(type: string): void {
    this.snippets.push(new Snippet($.extend(true, {}, defaults[type])));
  }
}


