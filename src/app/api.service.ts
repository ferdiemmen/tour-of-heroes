
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './app-config.service';

const apiUrl = 'https://localapi.reshift.nl:8001/';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private configService: ConfigService) { }

  get(url: string): Promise<any> {
    return this.http
      .get(this.getApiUrl(url), {
        headers: this._getHeaders(),
        withCredentials: true
      })
      .toPromise()
      .catch(err => {
        console.log(err);
      })
  }

  post(url: string, object: any): Promise<any> {
    return this.http
      .post(this.getApiUrl(url), JSON.stringify(object), {
        headers: this._getHeaders(),
        withCredentials: true
      })
      .toPromise()
      .catch(err => {
        console.log(err);
      })
  }

  put(url: string, object: any): Promise<any> {
    return this.http
      .put(this.getApiUrl(url), JSON.stringify(object), {
        headers: this._getHeaders(),
        withCredentials: true
      })
      .toPromise()
      .catch(err => {
        console.log(err);
      })
  }

  getApiUrl(url: string): string {
    return [apiUrl, url].join('');
  }

  private _getHeaders(): Headers {
     return new Headers({
      'X-CSRFTOKEN': this.configService.getProperty('csrftoken'),
      'Content-Type': 'application/json',
      'X-RESHIFT-SITE-ID': 2
    });
  }
}
