
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  query: string;

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    private _router: Router) { }

  redirectToSearch(query: string) {
    this.query = query;
    this._router.navigate(['/cms/article-list/'], { queryParams: { q: query } });
  }

  ngOnInit(): void {

    this.route
      .queryParams
      .switchMap((params: ParamMap) => this.articleService.getArticles(+params['page'], null, true, null, params['q']))
      .subscribe();
  }
}
