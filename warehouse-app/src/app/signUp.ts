import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { signUpComponent } from "./signUpComponent";
import { ads } from "./ads";

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, signUpComponent, ads],
  templateUrl: './html/signUp.html',
  styleUrls: ['./css/signLog.css']
})
export class SignUpComponent { }