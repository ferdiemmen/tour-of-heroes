
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <form name="password-reset">
      <label for="email">Email</label>
      <input type="email" name="email" />

      <input type="submit" value="Wachtwoordsleutel opvragen" />
    </form>
  `
})
export class PasswordResetComponent { }
