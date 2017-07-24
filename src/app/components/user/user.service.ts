
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from './user';
import { ConfigService } from '../../app-config.service';
import { ApiService } from '../../api.service';


@Injectable()
export class UserService {
  private user: User;
  private userUrl = 'accounts/'; // URL to web api

  constructor(
    private _configService: ConfigService,
    private _apiService: ApiService,
    private _router: Router) { }

  getUser(): User {
    return this.user;
  }

  login(): Promise<boolean> {
    const url = `${this.userUrl}login/`;

    return this._apiService.get(url)
      .then(response => {
        if (!response._body) {
          this._configService.removeProperty('csrftoken');
          return false;
        } else {
          this.user = response.json() as User;
          this._configService.setProperty('csrftoken', this.user.csrftoken);
          return true;
        }
      });
  }

  logout(): void {
    const url = `${this.userUrl}logout/`;
    this._apiService.get(url)
      .then(() => {
        this._router.navigate(['/cms/login']);
      });
  }
}
