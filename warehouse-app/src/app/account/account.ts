import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-account',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {
  passwordType: string = 'password';

  toggleIcon():string {
    return this.passwordType === 'password' ? 'assets/outside/reveal.png' : 'assets/outside/hidden.png';
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  email="admin@gmai.com"
  role="admin";
  currentDate = "2025-02-15"

  passwordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),

  })
  async onResetPassword(){

  }

  updateForm = new FormGroup({
    email: new FormControl('', Validators.required)
  })
  async onUpdate(){

  }
}
