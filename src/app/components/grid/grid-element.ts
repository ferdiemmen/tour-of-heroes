
import { GridElementDetails } from './grid-element-details';

const cellWidth = 32;
const cellHeight = 32;

export class GridElement {
  id: number;
  upperLeftCorner: string;
  downRightCorner: string;
  objectFk: number;
  objectModelName: string;
  objectDetails: GridElementDetails;
  styles: object;

  constructor(element?: object) {
    this.id = (element) ? element['id'] : null;
    this.objectFk = (element) ? element['objectFk'] : null;
    this.upperLeftCorner = (element) ? element['upperLeftCorner'] : '';
    this.downRightCorner = (element) ? element['downRightCorner'] : '';
    this.objectModelName = (element) ? element['objectModelName'] : 'article';
    this.objectDetails = (element) ? element['objectDetails'] : new GridElementDetails();
    this.styles = this._setStyles(element);
  }

  private _setStyles(element: object): object {
    const upperLeft = element['upperLeftCorner'].split(',');
    const downRight = element['downRightCorner'].split(',');
    const width = Math.round(((downRight[0] - upperLeft[0]) * cellWidth));
    const height = Math.round(((downRight[1] - upperLeft[1]) * cellHeight));

    return {
      left:     `${upperLeft[0] * cellHeight}px`,
      top:      `${upperLeft[1] * cellWidth}px`,
      width:    `${width}`,
      height:   `${height}`,
      widthPX:  `${width}px`,
      heightPX: `${height}px`,
    };

  }
}
