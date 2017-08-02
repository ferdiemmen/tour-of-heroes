
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';

import 'rxjs/add/operator/debounceTime';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-kieskeurig',
  template: `
    <i class="fa fa-cog" aria-hidden="true" (click)="edit = !edit"></i>
    <div class="snippet snippet__kieskeurig">
      <div class="snippet-edit" *ngIf="edit">
        <ul *ngFor="let product of snippet.data['products'];let i = index">
          <li>
            <input type="text" [(ngModel)]="snippet.data['products'][i].id">
            <button (click)="removeProduct(i)">
              <i class="fa fa-minus-square-o" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
        <button (click)="addProduct()">
          <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        </button>

        <input [value]="snippet.data['group']" [formControl]="groupControl" />
        <input [value]="snippet.data['height']" [formControl]="heightControl" />

        <button type="button" (click)="updateUrl()">Aanpassen</button>
      </div>
      <iframe
        width="640"
        [height]="snippet.data['height']"
        [src]="url"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `,
})
export class SnippetKieskeurigComponent implements OnInit {
  edit: boolean = false;
  groupControl: FormControl = new FormControl();
  heightControl: FormControl = new FormControl();
  url: SafeResourceUrl;

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.groupControl.valueChanges
      .subscribe(value => this.snippet.data['group'] = value);

    this.heightControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.snippet.data['height'] = value);
  }

  ngOnInit(): void {
    this.updateUrl();
  }

  addProduct(): void {
    if (this.snippet.data['products'].length < 3) {
      this.snippet.data['products'].push($.extend(true, {}, {id: ''}));
    }
  }

  removeProduct(index: number): void {
    this.snippet.data['products'].splice(index, 1);
  }

  updateUrl(): void {
    let url = 'https://www.kieskeurig.nl/widget/get?type=product_widget&output=html';
    const products = this.snippet.data['products'];
    const productGroup = this.snippet.data['group'];

    if (products.length) {
      products.map(product => url += '&products[]=' + product.id);
    } else if (productGroup) {
      url += '&group=' + productGroup;
    }

    this.edit = false;

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
