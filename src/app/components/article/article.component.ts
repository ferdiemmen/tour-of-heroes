
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ObservableInput } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { User } from '../user/user';
import { AuthorService } from '../author/author.service';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { Article } from './article';
import { ArticleService } from './article.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  private tabIndex: number;

  constructor(
    public articleService: ArticleService,
    public categoryService: CategoryService,
    public authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
      this.tabIndex = 1;
    }

  goBack(): void {
    this.location.back();
  }

  save(cont: boolean): void {
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

  objectById(item1: any, item2: any) {
    if (!item1 || !item2) { return };
    return item1.id === item2.id;
  }


  private getCategories(): Promise<Category[]> {
    // Get all the categories.
    return this.categoryService.getCategories();
  }

  private getAuthors(): Promise<User[]> {
    // Get all the authors.
    return this.authorService.getAuthors();
  }

  private setDefault(property: string): void {

    switch (property) {
      case 'author':
        // A new article doesn't have a author by default. After we got
        // all the authors we set it to the site's default author.
        this.articleService.article[property] = this.authorService.authors
                                                  .find(c => c.slug === 'tsja');
        break;
      case 'category':
        // A new article doesn't have a category by default. After we got
        // all the categories we set it to the site's default category.
        this.articleService.article[property] = this.categoryService.categories
                                                  .find(c => c.slug === 'nieuws');
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {

    this.route.paramMap
      .switchMap((params: ParamMap) => {

        // Clear previous Article instance on service.
        this.articleService.article = new Article();

        this.getCategories().then(_ => this.setDefault('category'));
        this.getAuthors().then(_ => this.setDefault('author'));

        if (!params.get('id')) {
          return [];
        }

        return this.articleService.getArticle(+params.get('id'));
      }
    )
    .subscribe();
  }

}
