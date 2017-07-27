
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
  templateUrl: './snippet-list.component.html',
  providers: [ArticleService]
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
