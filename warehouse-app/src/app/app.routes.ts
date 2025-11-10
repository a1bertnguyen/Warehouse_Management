import { Routes } from '@angular/router';
import { SignUpComponent } from './signUp';
import { LogInComponent } from './logIn';

import { Admin } from './admin/admin';
import { manageUser } from './admin/manageUser';
import { Statistic } from './admin/statistic';

import { Account } from './account/account';

import { WarehouseManager } from './warehouse-manager/warehouse-manager';
import { Category } from './warehouse-manager/category';
import { Supplier } from './warehouse-manager/supplier';
import { Transaction } from './warehouse-manager/transaction';
import { transactionDetail } from './warehouse-manager/transaction-details';
import { Product } from './warehouse-manager/product';
import { Inventory } from './warehouse-manager/inventory';

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
    },
    {
      path: 'statistic',
      component: Statistic
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
    },
    {
      path: 'transaction/:type',
      component: Transaction
    },
    {
      path: 'product',
      component: Product
    },
    {
      path: 'inventory',
      component: Inventory
    }]
  },
  {
    path: 'transaction-detail/:id',
    component: transactionDetail
  }
];
export default routeConfig;