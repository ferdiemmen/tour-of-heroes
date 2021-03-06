
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['../article/article-list.component.scss'],
  providers: [ArticleService]
})
export class PageListComponent implements OnInit {
  query: string;

  constructor(
    public articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  redirectToSearch(query: string) {
    this.query = query;
    this._router.navigate(['/cms/page-list/'], { queryParams: { q: query } });
  }

  ngOnInit(): void {

    this._route
    .queryParams
    .switchMap((params: ParamMap) => {
        const options = {
          page: +params['page'],
          pages: true,
          query: params['q']
        }
        return this.articleService.getArticles(options);
      })
      .subscribe();
  }
}
