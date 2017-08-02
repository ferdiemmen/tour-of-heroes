
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

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

  @Input('service') service: ArticleService;

  constructor() {
    this.seoKeywordControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.service.article.seoKeyword = value;
        this.check();
      });
  }

  check() {
    this.service.article.seoScore = _rs.Seo.seoCheck(this.service.article,
                                                     this.service.article.snippetsJson,
                                                     this.service.article.snippetsMediaObjects);
  }
}
