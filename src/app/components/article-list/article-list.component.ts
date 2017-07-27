
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.articleService.getArticles(+params['page'], null, true))
      .subscribe();
  }
}
