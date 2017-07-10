
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

const apiUrl = 'https://localapi.reshift.nl:8001/';

@Injectable()
export class ApiService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'X-RESHIFT-SITE-ID': 2
  });

  constructor(
    private http: Http) { }

  get(url: string): Promise<any> {
    return this.http
      .get(this.getApiUrl(url), {headers: this.headers})
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

  getApiUrl(url: string): string {
    return [apiUrl, url].join('');
  }
}
