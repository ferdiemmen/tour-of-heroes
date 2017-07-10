
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <form ngNoForm name="authentication" action="http://localapi.reshift.nl:8000/accounts/loginform/" target="_self" method="POST">
      <input type="hidden" name="next_url" value="http://localhost:4200/cms">

      <label for="username">Gebruikersnaam</label>
      <input type="text" name="username" />

      <label for="password">Wachtwoord</label>
      <input type="password" name="password" />

      <button type="submit">Inloggen</button>

      <a routerLink="/cms/password-reset">Wachtwoord vergeten?</a>
    </form>
  `
})
export class AuthenticationComponent { }
