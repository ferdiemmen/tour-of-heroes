
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Article } from '../article/article';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleService } from '../article/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['../article-list/article-list.component.scss']
})
export class PageListComponent extends ArticleListComponent implements OnInit {

  constructor(
    articleService: ArticleService,
    route: ActivatedRoute
  ) {
     super(articleService, route);
  }  

  ngOnInit(): void {

    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.articleService.getArticles(+params['page'], true))
      .subscribe();
  }
}
