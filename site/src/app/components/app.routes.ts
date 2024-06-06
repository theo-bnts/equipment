import { Routes } from '@angular/router';

import { AuthGuard } from '../services/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoanedListComponent } from './pages/loaned/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/home'},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'loaned/list', pathMatch: 'full', component: LoanedListComponent, canActivate: [AuthGuard] },
  { path: 'account', pathMatch: 'full', component: AccountComponent, canActivate: [AuthGuard] }
];
