
import { Injectable } from '@angular/core';
import * as $ from 'jquery';

import { Snippet } from './snippet';

// Snippet default settings.
const defaults = {
  paragraph:  { type: 'paragraph', data: { body: '' } },
  header:     { type: 'header',    data: { body: '' } },
  quote:      { type: 'quote',     data: { body: '' } },
  image:      { type: 'image',     data: { } },
  iframe:     { type: 'iframe',    data: { body: '', height: 360 } },
  youtube:    { type: 'youtube',   data: { body: '3jWRrafhO7M' } },
  instagram:  { type: 'instagram', data: { body: '8Qk4RJrDcV' } },
  twitter:    { type: 'twitter',   data: { body: '51434244341383168' } },
  twitch:     { type: 'twitch',    data: { body: 'officialgamernl' } },
  pagebreak:  { type: 'pagebreak', data: { body: '' } },
}

@Injectable()
export class SnippetService {
  public snippets: Snippet[];

  constructor() { }

  /**
   * Add a snippet to the snippets list.
   * Optionally adding an position number by index.
   *
   * @param {string} type - The type of snippet.
   * @param {number} [index] - The position in which to add the new snippet.
   * @memberof SnippetService
   */
  addSnippet(type: string, index?: number): void {

    // We use the $.extend function to make a copy of the defaults object.
    // This prevents a scoping issue which would update the defaults objects.
    const snippet = new Snippet($.extend(true, {}, defaults[type]));

    if (index || index === 0) {
      this.snippets.splice(index, 0, snippet);
    } else {
      this.snippets.push(snippet);
    }
  }
}
