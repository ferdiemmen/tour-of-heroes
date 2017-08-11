
import { Injectable } from '@angular/core';

import { GridElement } from './grid-element';
import { ArticleService } from '../article/article.service';
import { GridService } from './grid.service';

@Injectable()
export class GridElementService {

  constructor(
    private _gridService: GridService,
    private _articleService: ArticleService) {}

  public create(coordinates) {
    this._articleService.pickArticle()
      .then(article => {

        const element = this._constructElement(article, coordinates);
        // this._gridService.addElement
      });
  }

  private _constructElement(object: any, coordinates: Array<any>): GridElement {
    console.log(object, coordinates);
    return new GridElement();
  }

}
