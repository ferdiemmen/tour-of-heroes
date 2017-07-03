
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  name: string;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    // Deselect if the hero is the same as the selected.
    if (hero === this.selectedHero) {
      this.selectedHero = null;
      return;
    }

    // Set the selected hero or null.
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    if (!name) { return; }
    this.heroService.createHero(name)
      .then(hero => {
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .removeHero(hero)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null };
      });
  }

  ngOnInit(): void {
    // Lifecycle hook
    // Get the hero data when the AppComponent activates.
    this.getHeroes();
  }
}
