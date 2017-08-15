
import { Injectable } from '@angular/core';

import { ApiService } from '../../api.service';
import { GridElement } from './grid-element';
import { ArticleService } from '../article/article.service';
import { GridService } from './grid.service';

@Injectable()
export class GridElementService {

  private _gridElementUrl: string = `modules/featured_grids/`;

  constructor(
    private _apiService: ApiService,
    private _gridService: GridService,
    private _articleService: ArticleService) {}

  public add(coordinates) {
    this._articleService.pickArticle()
      .then(article => {
        const element = this._constructElement(article, coordinates);
        this._gridService.addElement(element);
      });
  }

  private _constructElement(object: any, coordinates: Array<any>): GridElement {

    if (coordinates[0]) {
      object.upperLeftCorner = Math.round(coordinates[0].left / 32) + ',' + Math.round(coordinates[0].top / 32);
    } else {
      object.upperLeftCorner = Math.round(coordinates[1].left / 32) + ',' + Math.round(coordinates[1].top / 32);
    }
    if (coordinates[1]) {
      object.downRightCorner = Math.round((coordinates[1].left / 32) + 1) + ',' + Math.round((coordinates[1].top / 32) + 1);
    } else {
      object.downRightCorner = Math.round((coordinates[0].left / 32) + 1) + ',' + Math.round((coordinates[0].top / 32) + 1);
    }

    object.objectFk = object.id;
    object.objectModelName = 'article';
    object.objectDetails = {
      title: object.title,
      subtitle: object.subtitle,
      category: object.category[0],
      media: object.media
    };

    return new GridElement(object);
  }

}
