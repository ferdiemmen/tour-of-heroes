
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';

import { Snippet } from '../snippet';


@Component({
  selector: 'app-snippet-review',
  templateUrl: './snippet-review.component.html'
})
export class SnippetReviewComponent {
  productnameControl: FormControl = new FormControl();
  scoreControl: FormControl = new FormControl();
  conclusionControl: FormControl = new FormControl();

  @Input('snippet') snippet: Snippet;

  constructor(private sanitizer: DomSanitizer) {
    this.productnameControl.valueChanges
      .subscribe(value => this.snippet.data['productname'] = value);

    this.scoreControl.valueChanges
      .subscribe(value => this.snippet.data['score'] = value);

    this.conclusionControl.valueChanges
      .subscribe(value => this.snippet.data['conclusion'] = value);
  }

  addPositive(): void {
    if (this.snippet.data['positives'].length < 3) {
      this.snippet.data['positives'].push($.extend(true, {}, {text: ''}));
    }
  }

  removePositive(index: number): void {
    this.snippet.data['positives'].splice(index, 1);
  }

  addNegative(): void {
    if (this.snippet.data['negatives'].length < 3) {
      this.snippet.data['negatives'].push($.extend(true, {}, {text: ''}));
    }
  }

  removeNegative(index: number): void {
    this.snippet.data['negatives'].splice(index, 1);
  }
}
