
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http) { }

  get(url: string): Promise<any> {
    return this.http
      .get(url)
      .toPromise();
  }

  post(url: string, object: any): Promise<any> {
    return this.http
      .post(url, JSON.stringify(object), {headers: this.headers})
      .toPromise();
  }

  put(url: string, object: any): Promise<any> {
    return this.http
      .put(url, JSON.stringify(object), {headers: this.headers})
      .toPromise();
  }
}
