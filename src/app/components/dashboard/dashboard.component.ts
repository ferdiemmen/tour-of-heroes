
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero/hero';
import { CacheService } from '../cache/cache.service';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Top Heroes</h2>
    <div class="grid grid-pad">
      <a *ngFor="let hero of heroes" [routerLink]="['/detail', hero.id]" class="col-1-4">{{hero.name}}</a>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private cacheService: CacheService) { }

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
