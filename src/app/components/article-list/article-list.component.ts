
import { Component, OnInit } from '@angular/core';

import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles();
  }
}
