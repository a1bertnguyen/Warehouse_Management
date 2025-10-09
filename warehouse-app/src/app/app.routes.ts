import { Routes } from '@angular/router';
import { SignUpComponent } from './signUp';
import { LogInComponent } from './logIn';

const routeConfig: Routes = [
  {
    path: '',
    component: SignUpComponent,
    title: 'Sign up page'
  },
  {
    path: 'login',
    component: LogInComponent,
    title: 'Log in page'
  }
];
export default routeConfig;