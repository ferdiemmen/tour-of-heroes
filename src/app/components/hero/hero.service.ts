import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Hero } from './hero';
import { CacheService } from '../cache/cache.service';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes' // URL to web api 
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private cacheService: CacheService) { }

  // Get hero by id.
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        // Save 'hero' on cache service.
        this.cacheService.setCache(`hero_${id}`, response.json().data as Hero);
        
        return response.json().data as Hero
      })
      .catch(this.handleError);
  }

  // Get all heroes.
  getHeroes(): Promise<Hero[]> {
    if (this.cacheService.getCache('heroes')) {
      return Promise.resolve(this.cacheService.getCache('heroes'));
    } else {
      return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => {
          // Save 'heroes' on cache service.
          this.cacheService.setCache('heroes', response.json().data as Hero[]);
          
          return response.json().data as Hero[];
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

  updateHero(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => {
        if (this.cacheService.getCache(`hero_${hero.id}`)) { 
          // Update the cached hero.
          this.cacheService.setCache(`hero_${hero.id}`, hero as Hero);
        }
        return hero;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
