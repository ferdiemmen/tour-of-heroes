
import { GridElementDetails } from './grid-element-details';

const cellWidth = 32;
const cellHeight = 32;

export class GridElement {
  id: number;
  upperLeftCorner: string;
  objectModelName: string;
  objectDetails: GridElementDetails;
  styles: object;

  constructor(element?: object, coordinates?: Array<any>) {
    this.id = (element) ? element['id'] : null;
    this.upperLeftCorner = (element) ? element['upperLeftCorner'] : '';
    this.objectModelName = (element) ? element['objectModelName'] : '';
    this.objectDetails = (element) ? element['objectDetails'] : new GridElementDetails();
    this.styles = this._setStyles(element, coordinates);
  }

  private _setStyles(element: object, coordinates?: Array<any>): object {
    let upperLeft;
    let downRight;

    if (coordinates) {
      if (coordinates[0]) {
        upperLeft = (Math.round(coordinates[0].left / cellWidth) + ',' + Math.round(coordinates[0].top / cellHeight)).toString().split(',');
      } else {
        upperLeft = (Math.round(coordinates[1].left / cellWidth) + ',' + Math.round(coordinates[1].top / cellHeight)).toString().split(',');
      }
      if (coordinates[1]) {
        downRight = (Math.round((coordinates[1].left / cellWidth) + 1) + ',' + Math.round((coordinates[1].top / cellHeight) + 1)).toString().split(',');
      } else {
        downRight = (Math.round((coordinates[0].left / cellWidth) + 1) + ',' + Math.round((coordinates[0].top / cellHeight) + 1)).toString().split(',');
      }
    } else {
      upperLeft = element['upperLeftCorner'].split(',');
      downRight = element['downRightCorner'].split(',');
    }

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
