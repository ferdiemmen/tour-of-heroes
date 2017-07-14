
import { Injectable } from '@angular/core';

import { User } from './user';
import { ConfigService } from '../../app-config.service';
import { ApiService } from '../../api.service';


@Injectable()
export class UserService {
  private user: User;
  private userUrl = 'accounts/'; // URL to web api

  constructor(
    private configService: ConfigService,
    private apiService: ApiService) { }

  getUser(): User {
    return this.user;
  }

  login(): Promise<boolean> {
    const url = `${this.userUrl}login/`;

    return this.apiService.get(url)
      .then(response => {
        if (!response._body) {
          this.configService.removeProperty('csrftoken');
          return false;
        } else {
          this.user = response.json() as User;
          this.configService.setProperty('csrftoken', this.user.csrftoken);
          return true;
        }
      });
  }
}
