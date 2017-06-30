import { Injectable } from '@angular/core';
import { Hero, HEROES } from './hero';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class HeroService {

  constructor(private cacheService: CacheService) { }

  getHero(id: Number): Promise<Hero> {
    return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    if (this.cacheService.getCache('heroes')) {
      return Promise.resolve(this.cacheService.getCache('heroes'));
    } else {
      this.cacheService.setCache('heroes', HEROES);
      return Promise.resolve(HEROES);
    }
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
}
