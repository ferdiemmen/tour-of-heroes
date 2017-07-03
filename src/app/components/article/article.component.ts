
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ObservableInput } from 'rxjs/Observable';

import { Article } from './article';
import { ArticleService } from './article.service';

import { MediumEditorComponent } from 'ng2-meditor';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location) { }

  goBack(): void {
    this.location.back();
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
