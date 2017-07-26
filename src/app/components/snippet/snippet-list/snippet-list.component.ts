
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as $ from 'jquery';

import { Snippet } from '../snippet';
import { Article } from '../../article/article';
import { ArticleService } from '../../article/article.service';
import { CategoryService } from '../../category/category.service';

import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-snippet-list',
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div class="snippet snippet__list">
      <div class="snippet-edit" *ngIf="edit">
        <input type="number" [value]="snippet.data.amount" [formControl]="amountControl" />

        <div class="snippet-edit__element scrollable--y">
          <label class="cms-checkbox" *ngFor="let category of categoryService.categories" >
            <input
              class="cms-checkbox__element"
              type="checkbox"
              [checked]="hasProperty('categories', category)"
              (click)="toggleProperty('categories', category)">
            <span class="cms-checkbox__name">{{category.name}}</span>
          </label>
        </div>

        <input type="text" [value]="snippet.data.tag" [formControl]="tagControl" />

        <button type="button" (click)="getList()">Aanpassen</button>
      </div>
      <ul>
        <li *ngFor="let article of articles">
          <app-media-resized
            [media]="article.media"
            width="64"
            height="64"></app-media-resized>

          {{article.title}}
        </li>
      </ul>
    </div>
  `,
})
export class SnippetListComponent implements OnInit {
  edit: boolean = false;
  articles: Article[] = [];
  amountControl: FormControl = new FormControl();
  tagControl: FormControl = new FormControl();
  categoriesControl: FormControl = new FormControl();

  @Input('snippet') snippet: Snippet;

  constructor(
    private _articleService: ArticleService,
    public categoryService: CategoryService) {
    this.amountControl.valueChanges
      .subscribe(value => this.snippet.data['amount'] = value);

    this.tagControl.valueChanges
      .subscribe(value => this.snippet.data['tag'] = value);

    this.categoriesControl.valueChanges
      .subscribe(value => this.snippet.data['categories'] = value);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    const parameters = $.extend(true, {}, this.snippet.data);

    // The API expects category slugs.
    if (parameters['categories'].length) {
      parameters['categories'].forEach((category, index, array) => {
        array[index] = (category.hasOwnProperty('slug')) ? category.slug : category;
      });
    }

    // Make API call to get the articles.
    this._articleService.getArticles(null, null, false, parameters)
      .then(response => this.articles = response);

    this.edit = false;
  }

  hasProperty(property, value) {
    if (!this.snippet.data[property]) {
      return false;
    }

    return this.snippet.data[property].some(o => {
      if (o.id === value.id) {
        return true;
      }
      return false;
    });
  }

  toggleProperty(property: string, obj: object) {
    if (!this.snippet.data[property]) { this.snippet.data[property] = [] }

    // Toggle a property on the snippet.
    if (this.snippet.data[property].findIndex(el => el.id === obj['id']) !== -1) {
      this.snippet.data[property].splice([this.snippet.data[property].findIndex(el => el.id === obj['id'])], 1);
    } else {
      this.snippet.data[property].push(obj);
    }
  }
}
