
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { DeferredService } from '../deferred/deferred.service';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public query: string;
  public selecting: boolean = false;

  constructor(
    public articleService: ArticleService,
    private _hotkeysService: HotkeysService,
    private _deferredService: DeferredService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router) {

      this._hotkeysService.add(new Hotkey(['esc'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
        if (!this.selecting) { return event; }

        // If a user was in the process of selecting an article but had second thoughts
        // pressing ESC will return the user back to the previous page and resets the
        // deferred service.
        this._deferredService.reset();
        this._location.back();
      }));

    }

  /**
   * Callback function for <app-search> component, see template.
   * This reloads the view and adds the search query as a parameter to the url.
   * @param {string} query
   * @memberof ArticleListComponent
   */
  redirectToSearch(query: string) {
    this.query = query;
    this._router.navigate(['/cms/article-list/'], { queryParams: { q: query } });
  }

  ngOnInit(): void {
    this._route
      .queryParams
      .switchMap((params: ParamMap) => {
        // When the selecting parameter is set. Users can pick an article and it will resolve it
        // through the deferredService promise. This toggles the select function on the articles
        // in the article list.
        if (params['selecting']) { this.selecting = true; }

        return this.articleService.getArticles(+params['page'], null, true, null, params['q'])
      })
      .subscribe();
  }
}
