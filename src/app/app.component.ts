
import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
