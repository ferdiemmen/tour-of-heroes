
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <form name="authentication">
      <label for="username">Gebruikersnaam</label>
      <input type="text" name="username" />

      <label for="password">Wachtwoord</label>
      <input type="password" name="password" />

      <input type="submit" value="Inloggen" />

      <a routerLink="/cms/password-reset">Wachtwoord vergeten?</a>
    </form>
  `
})
export class AuthenticationComponent { }
