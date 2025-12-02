import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-account',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {
  route: ActivatedRoute = inject(ActivatedRoute);
  passwordType: string = 'password';

  constructor(private http:HttpClient, private router:Router){}

  toggleIcon():string {
    return this.passwordType === 'password' ? 'assets/outside/reveal.png' : 'assets/outside/hidden.png';
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  email="example email";
  role="example role";
  createdDate = "example date";

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

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
