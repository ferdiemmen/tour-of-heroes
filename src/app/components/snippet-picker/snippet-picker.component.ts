
import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { Snippet } from '../snippet/snippet';
import { SnippetService } from '../snippet/snippet.service';


@Component({
  selector: 'app-snippet-picker',
  styleUrls: ['./snippet-picker.component.scss'],
  template: `
    <ul class="snippet-picker">
      <li class="snippet-picker__item" data-type="paragraph">
        <i class="fa fa-paragraph" aria-hidden="true" (click)="snippetService.addSnippet('paragraph')"></i>
      </li>
      <li class="snippet-picker__item" data-type="header">
        <i class="fa fa-header" aria-hidden="true" (click)="snippetService.addSnippet('header')"></i>
      </li>
      <li class="snippet-picker__item" data-type="quote">
        <i class="fa fa-quote-right" aria-hidden="true" (click)="snippetService.addSnippet('quote')"></i>
      </li>
      <li class="snippet-picker__item" data-type="image">
        <i class="fa fa-picture-o" aria-hidden="true" (click)="snippetService.addSnippet('image')"></i>
      </li>
      <li class="snippet-picker__item" data-type="iframe">
        <i class="fa fa-code" aria-hidden="true" (click)="snippetService.addSnippet('iframe')"></i>
      </li>
      <li class="snippet-picker__item" data-type="youtube">
        <i class="fa fa-youtube-play" aria-hidden="true" (click)="snippetService.addSnippet('youtube')"></i>
      </li>
      <li class="snippet-picker__item" data-type="instagram">
        <i class="fa fa-instagram" aria-hidden="true" (click)="snippetService.addSnippet('instagram')"></i>
      </li>
      <li class="snippet-picker__item" data-type="twitter">
        <i class="fa fa-twitter" aria-hidden="true" (click)="snippetService.addSnippet('twitter')"></i>
      </li>
      <li class="snippet-picker__item" data-type="twitch">
        <i class="fa fa-twitch" aria-hidden="true" (click)="snippetService.addSnippet('twitch')"></i>
      </li>
      <li class="snippet-picker__item" data-type="pagebreak">
        <i class="fa fa-arrow-circle-right" aria-hidden="true" (click)="snippetService.addSnippet('pagebreak')"></i>
      </li>
      <li class="snippet-picker__item" data-type="snippetcontainer">
        <i class="fa fa-object-group" aria-hidden="true" (click)="snippetService.addSnippet('snippetcontainer')"></i>
      </li>
    </ul>
  `
})
export class SnippetPickerComponent implements AfterViewInit {

  @Input('snippets') snippets: Snippet[];

  constructor(public snippetService: SnippetService) { }

  ngAfterViewInit(): void {

    this.snippetService.snippets = this.snippets;

    // Users can add a snippet by dragging it from the picker to the snippets list.
    $('.snippet-picker li').draggable({
      helper: 'clone',
      connectToSortable: '.snippets',
      scroll: false
    });
  }
}


