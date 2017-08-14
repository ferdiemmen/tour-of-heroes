
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
        this._gridService.addElement(element);
      });
  }

  private _constructElement(object: any, coordinates: Array<any>): GridElement {

    object.objectDetails = {
      title: object.title,
      subtitle: object.subtitle,
      category: object.category[0],
      media: object.media
    };

    return new GridElement(object, coordinates);
  }

}
