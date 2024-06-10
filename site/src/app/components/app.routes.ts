import { Routes } from '@angular/router';
import { UserAuthGuard } from '../services/user.auth.guard';
import { AdministratorAuthGuard } from '../services/administrator.auth.guard';

import { LoginPageComponent } from './pages/login/login.component';
import { AccountPageComponent } from './pages/account/account.component';

import { UserHomePageComponent } from './pages/user/home/home.component';
import { UserLoanedListPageComponent } from './pages/user/loaned/list/list.component';
import { UserLoanableListPageComponent } from './pages/user/loanable/list/list.component';
import { UserLoanRequestPageComponent } from './pages/user/loan/request/request.component';

import { AdministrationHomePageComponent } from './pages/administration/home/home.component';
import { AdministrationLoanedListPageComponent } from './pages/administration/loaned/list/list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/account'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [UserAuthGuard] },

  { path: 'user/home', pathMatch: 'full', component: UserHomePageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loaned/list', pathMatch: 'full', component: UserLoanedListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loanable/list', pathMatch: 'full', component: UserLoanableListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loan/request', pathMatch: 'full', component: UserLoanRequestPageComponent, canActivate: [UserAuthGuard] },

  { path: 'administration/home', pathMatch: 'full', component: AdministrationHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/loaned/list', pathMatch: 'full', component: AdministrationLoanedListPageComponent, canActivate: [AdministratorAuthGuard] },
];
