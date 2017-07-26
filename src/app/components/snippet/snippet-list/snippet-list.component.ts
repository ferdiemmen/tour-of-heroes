
import { Component, OnInit, Input } from '@angular/core';

import { Snippet } from '../snippet';
import { Article } from '../../article/article';
import { ArticleService } from '../../article/article.service';


@Component({
  selector: 'app-snippet-list',
  template: `
    <ul class="snippet snippet__list">
      <li *ngFor="let article of articles">
        <app-media-resized
          [media]="article.media"
          width="64"
          height="64"></app-media-resized>

        {{article.title}}
      </li>
    </ul>
  `,
})
export class SnippetListComponent implements OnInit {
  articles: Article[] = [];

  @Input('snippet') snippet: Snippet;

  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
    this._articleService.getArticles(null, null, false)
      .then(response => this.articles = response);
  }
}
