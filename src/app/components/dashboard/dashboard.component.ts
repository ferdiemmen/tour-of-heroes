
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Top Heroes</h2>
    <div class="grid grid-pad">
      <a *ngFor="let hero of heroes" [routerLink]="['/detail', hero.id]" class="col-1-4">
        <div class="module hero">
          <h4>{{hero.name}}</h4>
        </div>
      </a>
    </div>
    <app-hero-search></app-hero-search>
  `
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .then(heroes => {
        this.heroes = heroes.slice(1, 5);
      });
  }
}
