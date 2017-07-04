
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ObservableInput } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { Article } from './article';
import { ArticleService } from './article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article = new Article();

  constructor(
    public articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let action = (this.article.id) ? 'update' : 'create';

    this.articleService[action](this.article)
      .then(article => {
        let id = (article.id) ? article.id : this.article.id;
        const link = ['/article/edit', id];
        this.router.navigate(link);
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (!params.get('id')) { return []; }
        return this.articleService.getArticle(+params.get('id'));
      }
    )
    .subscribe(article => this.article = article);
  }

}
