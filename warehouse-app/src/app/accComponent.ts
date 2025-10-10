import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'password-input',
  template: `
    <div class="password-container">
        <label for="password-input">Password</label>
        <div class="input-wrapper">
            <input
                [type]="passwordType"
                id="password-input" name="password"
                formControl="password"
            />
            <img
                [src]="toggleIcon()"
                alt="Toggle password visibility"
                (click)="togglePasswordVisibility()"
                class="reveal-icon"
            />
        </div>
    </div>
  `,
  styles: [`
    .password-container {
      display: flex;
      flex-direction: column;
      width: 250px;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    input {
      width: 100%;
      padding-right: 30px;
    }
    .reveal-icon {
      position: absolute;
      right: 5px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  `]
})
export class accComponent {
  passwordType: string = 'password';

  toggleIcon():string {
    return this.passwordType === 'password' ? 'assets/outside/reveal.png' : 'assets/outside/hidden.png';
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}