
import { Injectable } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// Convert a Observable to a Promise
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './app-config.service';

declare var _rs: any;

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private configService: ConfigService) { }

  get(url: string): Promise<any> {
    return this._apiCall('GET', url);
  }

  post(url: string, body: any): Promise<any> {
    return this._apiCall('POST', url, body);
  }

  put(url: string, body: any): Promise<any> {
    return this._apiCall('PUT', url, body);
  }

  upload(url: string, data: any): any {
    data.url = url;
    data.headers = this._getHeaders(true, true);
    data.xhrFields = {
      withCredentials: true
    };

    return data.submit();
  }

  private _getApiUrl(url: string): string {
    return [_rs.apiUrl, url].join('/');
  }

  private _apiCall(method: string, url: string, body?: any): Promise<any> {
    const req = new RequestOptions({
      method: method,
      url: this._getApiUrl(url),
      body: (body) ? JSON.stringify(body) : null,
      headers: this._getHeaders(),
      withCredentials: true
    });

    const request = new Request(req);

    return this.http.request(request)
      .toPromise()
      .catch(err => {
        console.log(err);
      });
  }

  private _getHeaders(json?: boolean, file?: boolean): any {
    const headers = {
      'X-CSRFTOKEN': this.configService.getProperty('csrftoken'),
      'Content-Type': (file) ? undefined : 'application/json',
      'X-RESHIFT-SITE-ID': 2
    };
    if (json) { return headers; }
    return new Headers(headers);
  }
}
