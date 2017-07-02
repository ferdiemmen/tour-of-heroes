
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';
import { CacheService } from '../cache/cache.service';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private router: Router,
    private heroService: HeroService,
    private cacheService: CacheService) { }

  onSelect(hero: Hero): void {
    if (hero === this.selectedHero) {
      this.selectedHero = null;
      return;
    }

    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    // Lifecycle hook
    // Get the hero data when the AppComponent activates.
    this.getHeroes();
  }
}
