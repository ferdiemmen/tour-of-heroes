
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


import { UserService } from './components/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    return this.userService.login()
      .then(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/cms/login']);
        }
        return loggedIn;
      });
  }
}
