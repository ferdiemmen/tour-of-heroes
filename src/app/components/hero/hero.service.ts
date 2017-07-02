import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Hero } from './hero';
import { CacheService } from '../cache/cache.service';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes' // URL to web api 

  constructor(private http: Http, private cacheService: CacheService) { }

  getHero(id: Number): Promise<Hero> {
    return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    if (this.cacheService.getCache('heroes')) {
      return Promise.resolve(this.cacheService.getCache('heroes'));
    } else {
      return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => {
          response.json().data as Hero[];
          this.cacheService.setCache('heroes', response.json().data as Hero[]);
        })
        .catch(this.handleError);
    }
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
