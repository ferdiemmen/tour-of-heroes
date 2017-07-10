
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

    this.apiService.get(url)
      .then(response => {
        // console.log(response);
      });
    
    // this.router.navigate(['/cms/login']);

    return true;
  }
}
