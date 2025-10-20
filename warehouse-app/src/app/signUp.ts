import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { signUpComponent } from "./signUpComponent";
import { ads } from "./ads";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, signUpComponent, ads, ReactiveFormsModule],
  templateUrl: './html/signUp.html',
  styleUrls: ['./css/signLog.css']
})
export class SignUpComponent { 
  constructor(private http:HttpClient, private router: Router){}
  signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  })
  async submitSignUp(){
    const email = this.signUpForm.value.email ?? '';
    const password = this.signUpForm.value.password ?? '';
    const passwordConfirm = this.signUpForm.value.passwordConfirm ?? '';

    if(!email || !password || !passwordConfirm){
      alert("Please fill in every fields");
      return;
    }else if(password!==passwordConfirm) {
      alert("Confirm password has to match the password");
      return;
    }

    const signUpData = {email, password}

    this.http.post('', signUpData)
    .subscribe({
      next: res => {
        alert('Sign Up Successful');
        this.signUpForm.reset();
        this.router.navigate(['login']);
      },
      error: err => alert('Sign Up Failed')
    });
  }
}