import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { logInComponent } from "./logInComponent";
import { ads } from "./ads";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterModule, logInComponent, ads],
  templateUrl: './html/logIn.html',
  styleUrls: ['./css/signLog.css']
})
export class LogInComponent { 
  constructor(private http:HttpClient, private router:Router){}
  logInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  async submitLogIn(){
    const email = this.logInForm.value.email ?? '';
    const password = this.logInForm.value.password ?? '';

    if(!email || !password){
      alert("Please fill in every fields");
      return;
    }

    const logInData = {email, password}
    let accessToken: string | undefined;

    let role: string = 'warehouse-manager';
    this.router.navigate([role]);

    /*this.http.post('', logInData)
    .subscribe({
      next: (response: any) => {
        alert('Login Successful');
        accessToken = response.data?.accessToken;
        localStorage.setItem('accessToken', accessToken ?? '');
        // Navigate to another page
        },
      error: err => alert('Login Failed')
    });*/
  }
}