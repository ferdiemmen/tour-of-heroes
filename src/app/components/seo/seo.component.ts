
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ArticleService } from '../article/article.service';

declare var _rs: any;

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent {
  alerts: object = _rs.Seo.alerts;
  seoKeywordControl: FormControl = new FormControl();
  titleTagControl: FormControl = new FormControl();
  descriptionControl: FormControl = new FormControl();
  tagsControl: FormControl = new FormControl();
  sourceControl: FormControl = new FormControl();
  sourceUrlControl: FormControl = new FormControl();
  canonicalControl: FormControl = new FormControl();

  @Input('service') service: ArticleService;

  constructor() {
    this.seoKeywordControl.valueChanges
      .subscribe(value => {
        this.service.article.seoKeyword = value;
        this.check();
      });

    this.titleTagControl.valueChanges
      .subscribe(value => {
        this.service.article.titleTag = value;
        this.check();
      });

    this.descriptionControl.valueChanges
      .subscribe(value => {
        this.service.article.description = value;
        this.check();
      });

    this.tagsControl.valueChanges
      .subscribe(value => {
        this.service.article.tags = value;
        this.check();
      });

    this.sourceControl.valueChanges
      .subscribe(value => {
        this.service.article.source = value;
        this.check();
      });

    this.sourceUrlControl.valueChanges
      .subscribe(value => {
        this.service.article.sourceUrl = value;
        this.check();
      });

    this.canonicalControl.valueChanges
      .subscribe(value => {
        this.service.article.canonical = value;
        this.check();
      });
  }

  check() {
    this.service.article.seoScore = _rs.Seo.seoCheck(this.service.article,
                                                     this.service.article.snippetsJson,
                                                     this.service.article.snippetsMediaObjects);
  }
}
