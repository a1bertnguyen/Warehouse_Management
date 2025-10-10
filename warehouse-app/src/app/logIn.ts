import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { logInComponent } from "./logInComponent";
import { ads } from "./ads";

@Component({
  selector: 'app-log-in',
  imports: [RouterModule, logInComponent, ads],
  templateUrl: './html/logIn.html',
  styleUrls: ['./css/signLog.css']
})
export class LogInComponent { }