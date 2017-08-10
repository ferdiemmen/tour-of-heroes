
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ProductService } from './product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public query: string;

  constructor(
    public productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  redirectToSearch(query: string) {
    this.query = query;
    this._router.navigate(['/cms/product-list/'], { queryParams: { q: query } });
  }

  ngOnInit() {
    this._route
      .queryParams
      .switchMap((params: ParamMap) => this.productService.getMasters(+params['page'], params['q']))
      .subscribe();
  }
}
