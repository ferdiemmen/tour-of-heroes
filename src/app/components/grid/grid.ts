
import { GridElement } from './grid-element';

export class Grid {
  id: number;
  title: string;
  active: boolean;
  published: boolean;
  elements: GridElement[];
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  publishDate: string;

  constructor(grid?: object) {
    this.active = false;
    this.published = false;
    this.elements = [];

    if (grid) {
      grid['elements'].forEach(element => {
        this.elements.push(new GridElement(element));
      });
    }
  }
}
