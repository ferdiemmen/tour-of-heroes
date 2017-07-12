
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <form ngNoForm name="authentication" action="https://localapi.reshift.nl:8001/accounts/loginform/" target="_self" method="POST">
      <input type="hidden" name="next_url" value="https://local.gamer.nl:4000/cms">

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
