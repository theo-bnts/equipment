import { Routes } from '@angular/router';

import { AccountPageComponent } from './pages/account/account.component';
import { UserAuthGuard } from '../services/user.auth.guard';
import { AdministratorAuthGuard } from '../services/administrator.auth.guard';
import { UserHomePageComponent } from './pages/user/home/home.component';
import { AdministrationHomePageComponent } from './pages/administration/home/home.component';
import { LoanableListPageComponent } from './pages/loanable/list/list.component';
import { LoanedListPageComponent } from './pages/loaned/list/list.component';
import { LoanRequestPageComponent } from './pages/loan/request/request.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/account'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/home', pathMatch: 'full', component: UserHomePageComponent, canActivate: [UserAuthGuard] },
  { path: 'loanable/list', pathMatch: 'full', component: LoanableListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'loan/request', pathMatch: 'full', component: LoanRequestPageComponent, canActivate: [UserAuthGuard] },
  { path: 'loaned/list', pathMatch: 'full', component: LoanedListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'administration/home', pathMatch: 'full', component: AdministrationHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/loaned/list', pathMatch: 'full', component: LoanedListPageComponent, canActivate: [AdministratorAuthGuard] },
];
