
import { Injectable } from '@angular/core';


const config = {
  prevAmount: 3,
  nextAmount: 3
};

@Injectable()
export class PaginationService {
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = []

  constructor() { }

  setupPagination(currentPage: number, totalPages: number) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.pages = [];

    for (let i = 1; i < (config.prevAmount + 1); i++) {
      if ((currentPage - i) > 0) {
        this.pages.unshift(currentPage - i);
      }
    }

    this.pages.push(currentPage);

    for (let i = 1; i < (config.nextAmount + 1); i++) {
      if ((currentPage + i) <= totalPages) {
        this.pages.push(currentPage + i);
      }
    }
  }
}
