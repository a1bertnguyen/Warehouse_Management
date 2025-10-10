import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'signup-input',
  template: `
    <div class="email-container">
        <label class="email-input">Email</label>
        <input type="email" id="email-input" name="email" formControlName="email" required/>
    </div>
    <div class="password-container">
        <label for="password-input">Password</label>
        <div class="input-wrapper">
            <input
                [type]="passwordType"
                id="password-input" name="password"
                formControlName="password"
                required
            />
            <img
                [src]="toggleIcon()"
                alt="Toggle password visibility"
                (click)="togglePasswordVisibility()"
                class="reveal-icon"
            />
        </div>
    </div>
    <div class="password-confirm-container">
        <label for="password-confirm-input">Password confirm</label>
        <input
            [type]="passwordType"
            id="password-confirm-input" name="password-confirm"
            formControlName="passwordConfirm"
            required
        />
    </div>
  `,
  styleUrls: ['css/signLogComp.css']
})

export class signUpComponent {
  passwordType: string = 'password';

  toggleIcon():string {
    return this.passwordType === 'password' ? 'assets/outside/reveal.png' : 'assets/outside/hidden.png';
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}