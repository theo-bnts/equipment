import { Routes } from '@angular/router';

import { AccountPageComponent } from './pages/account/account.component';
import { AuthGuard } from '../services/auth.guard';
import { UserHomePageComponent } from './pages/user/home/home.component';
import { AdminHomePageComponent } from './pages/administration/home/home.component';
import { LoanableListPageComponent } from './pages/loanable/list/list.component';
import { LoanedListPageComponent } from './pages/loaned/list/list.component';
import { LoanRequestPageComponent } from './pages/loan/request/request.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/account'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'user/home', pathMatch: 'full', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: 'administration/home', pathMatch: 'full', component: AdminHomePageComponent, canActivate: [AuthGuard] },
  { path: 'loanable/list', pathMatch: 'full', component: LoanableListPageComponent, canActivate: [AuthGuard] },
  { path: 'loan/request', pathMatch: 'full', component: LoanRequestPageComponent, canActivate: [AuthGuard] },
  { path: 'loaned/list', pathMatch: 'full', component: LoanedListPageComponent, canActivate: [AuthGuard] },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [AuthGuard] }
];
