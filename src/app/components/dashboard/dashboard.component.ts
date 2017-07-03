
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <a routerLink="/article/create">
        Maak artikel aan
      </a>
      <a routerLink="/page/create">
        Maak pagina aan
      </a>
    </div>
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
