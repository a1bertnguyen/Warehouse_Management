import { Routes } from '@angular/router';
import { SignUpComponent } from './signUp';
import { LogInComponent } from './logIn';

import { Admin } from './admin/admin';
import { manageUser } from './admin/manageUser';
import { Account } from './account/account';

import { WarehouseManager } from './warehouse-manager/warehouse-manager';
import { Category } from './warehouse-manager/category';
import { Supplier } from './warehouse-manager/supplier';

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
  },
  {
    path: 'admin',
    component: Admin,
    title: 'admin',
    children: [{
      path: '',
      component: Account
    },
    {
      path:'manage-user',
      component: manageUser
    },
    {
      path: 'account',
      component: Account,
    }]
  },
  {
    path:'warehouse-manager',
    component: WarehouseManager,
    title:'Warehouse-manager',
    children:[{
      path: '',
      component: Account
    },
    {
      path: 'account',
      component: Account
    },
    {
      path: 'category',
      component: Category
    },
    {
      path: 'supplier',
      component: Supplier
    }]
  }
];
export default routeConfig;