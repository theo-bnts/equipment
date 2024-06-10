import { Routes } from '@angular/router';

import { AdministratorAuthGuard } from '../services/administrator.auth.guard';
import { UserAuthGuard } from '../services/user.auth.guard';

import { AccountPageComponent } from './pages/account/account.component';
import { LoginPageComponent } from './pages/login/login.component';

import { UserHomePageComponent } from './pages/user/home/home.component';
import { UserLoanableListPageComponent } from './pages/user/loanable/list/list.component';
import { UserLoanedListPageComponent } from './pages/user/loaned/list/list.component';
import { UserLoanRequestPageComponent } from './pages/user/loan/request/request.component';

import { AdministrationAccountListPageComponent } from './pages/administration/account/list/list.component';
import { AdministrationEquipmentHomePageComponent } from './pages/administration/equipment/home/home.component';
import { AdministrationEquipmentListPageComponent } from './pages/administration/equipment/list/list.component';
import { AdministrationHomePageComponent } from './pages/administration/home/home.component';
import { AdministrationLoanedListPageComponent } from './pages/administration/loaned/list/list.component';
import { AdministrationReferenceListPageComponent } from './pages/administration/reference/list/list.component';
import { AdministrationTypeListPageComponent } from './pages/administration/type/list/list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/account'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [UserAuthGuard] },

  { path: 'user/home', pathMatch: 'full', component: UserHomePageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loanable/list', pathMatch: 'full', component: UserLoanableListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loan/request', pathMatch: 'full', component: UserLoanRequestPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loaned/list', pathMatch: 'full', component: UserLoanedListPageComponent, canActivate: [UserAuthGuard] },

  { path: 'administration/home', pathMatch: 'full', component: AdministrationHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/loaned/list', pathMatch: 'full', component: AdministrationLoanedListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/equipment/home', pathMatch: 'full', component: AdministrationEquipmentHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/equipment/list', pathMatch: 'full', component: AdministrationEquipmentListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/reference/list', pathMatch: 'full', component: AdministrationReferenceListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/type/list', pathMatch: 'full', component: AdministrationTypeListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/account/list', pathMatch: 'full', component: AdministrationAccountListPageComponent, canActivate: [AdministratorAuthGuard] },
];
