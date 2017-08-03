
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ObservableInput } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import * as $ from 'jquery';
import 'jqueryui';

import { ConfigService } from './../../app-config.service';
import { Article } from './article';
import { ArticleService } from './article.service';
import { Media } from '../media/media';
import { MediaService } from '../media/media.service';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { FeedService } from '../feed/feed.service';
import { SiteService } from '../site/site.service';

declare var _rs: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public mediaEdit: boolean = false;
  public siteId: number = _rs.siteId;
  public tabIndex: number;

  constructor(
    public articleService: ArticleService,
    public mediaService: MediaService,
    public categoryService: CategoryService,
    public authorService: AuthorService,
    public feedService: FeedService,
    public siteService: SiteService,
    public configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute) {

      // Set initial tab index.
      this.tabIndex = 1;
    }

  save(cont?: boolean): void {
    let link;
    let action = (this.articleService.article.id) ? 'update' : 'create';

    this.articleService[action]()
      .then(article => {
        if (action === 'create' || cont) {
          link = ['/cms/article/edit', article.id];
          action = 'update';
          // #TODO: Add notification telling user the article is created.
          // if (cont) {   };
        } else {
          link = ['/cms/article-list'];
        }
        this.router.navigate(link);
      });
  }

  setHeaderMedia(): void {
    this.mediaService
      .pickMedia()
      .then(res => {
        this.articleService.updateProperty('media', res);
      });
  }

  headerAlignChanged(position: string): void {
    this.articleService.article.headerCrop = position;
  }

  objectById(item1: any, item2: any) {
    if (!item1 || !item2) { return };
    return item1.id === item2.id;
  }

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.authorService.getAuthors();
    this.feedService.getFeeds();
    this.siteService.getSites();

    this.route.paramMap
      .switchMap((params: ParamMap) => this.articleService.getArticle(+params.get('id')))
      .subscribe();
  }
}
