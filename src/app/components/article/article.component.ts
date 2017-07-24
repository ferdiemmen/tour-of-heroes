
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ObservableInput } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import * as $ from 'jquery';
import 'jqueryui';

import { Article } from './article';
import { ArticleService } from './article.service';
import { Media } from '../media/media';
import { MediaService } from '../media/media.service';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { FeedService } from '../feed/feed.service';
import { SiteService } from '../site/site.service';
import { SnippetService } from '../snippet/snippet.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewInit {
  public tabIndex: number;

  constructor(
    public articleService: ArticleService,
    public mediaService: MediaService,
    public categoryService: CategoryService,
    public authorService: AuthorService,
    public feedService: FeedService,
    public siteService: SiteService,
    private snippetService: SnippetService,
    private chRef: ChangeDetectorRef,
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
        const id = (article.id) ? article.id : this.articleService.article.id;
        if (action === 'create' || cont) {
          link = ['/cms/article/edit', id];
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
      .switchMap((params: ParamMap) => {
        return this.articleService.getArticle(+params.get('id'));
      })
      .subscribe();
  }

  ngAfterViewInit() {
    let previousIndex: number;

    $('#snippets').sortable({
      handle: '.handle',
      helper: 'original',
      placeholder: 'ui-state-highlight',
      forcePlaceholderSize: true,
      tolerance: 'pointer',
      start: ( event, ui ) => {
        previousIndex = ui.item.index();
      },
      stop: ( event, ui ) => {
        if (previousIndex === ui.item.index() || ui.item.index() === -1) { return; }

        const a = this.articleService.article.snippetsJson[previousIndex];
        this.articleService.article.snippetsJson.splice(previousIndex, 1);
        this.articleService.article.snippetsJson.splice(ui.item.index(), 0, a);
        this.chRef.detectChanges();
      },
      receive: ( event, ui ) => {
        const index = $('#snippets').data('ui-sortable').currentItem.index();
        this.snippetService.addSnippet($(ui.item).data('type'), index);
        this.chRef.detectChanges();

        $('#snippets .ui-draggable').remove();
      }
    });
  }
}
