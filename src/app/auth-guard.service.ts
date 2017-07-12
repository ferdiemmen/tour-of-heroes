
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ApiService } from './api.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  canActivate() {
    const url = 'accounts/login/';

    return this.apiService.get(url)
      .then(response => {
        if (!response._body) {
          this.router.navigate(['/cms/login']);
          return false;
        } else {
          return true;
        }
      });
  }
}
