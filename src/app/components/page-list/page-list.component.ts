
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['../article-list/article-list.component.scss'],
  providers: [ArticleService]
})
export class PageListComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {

    this._route
      .queryParams
      .switchMap((params: ParamMap) => this.articleService.getArticles(+params['page'], true, true))
      .subscribe();
  }
}
