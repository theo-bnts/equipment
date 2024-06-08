import { Routes } from '@angular/router';

import { AccountPageComponent } from './pages/account/account.component';
import { AuthGuard } from '../services/auth.guard';
import { HomePageComponent } from './pages/home/home.component';
import { LoanableListPageComponent } from './pages/loanable/list/list.component';
import { LoanedListPageComponent } from './pages/loaned/list/list.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/home'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'home', pathMatch: 'full', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'loanable/list', pathMatch: 'full', component: LoanableListPageComponent, canActivate: [AuthGuard] },
  { path: 'loaned/list', pathMatch: 'full', component: LoanedListPageComponent, canActivate: [AuthGuard] },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [AuthGuard] }
];
