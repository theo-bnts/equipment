import { Routes } from '@angular/router';

import { AdministratorAuthGuard } from '../services/administrator.auth.guard';
import { UserAuthGuard } from '../services/user.auth.guard';

import { AccountPageComponent } from './pages/account/account.component';
import { LoginPageComponent } from './pages/login/login.component';

import { UserHomePageComponent } from './pages/user/home/home.component';
import { UserAvailableEquipmentsListPageComponent } from './pages/user/equipments/available/list/list.component';
import { UserLoansListPageComponent } from './pages/user/loans/list/list.component';
import { UserLoanRequestPageComponent } from './pages/user/loans/request/request.component';

import { AdministrationHomePageComponent } from './pages/administration/home/home.component';
import { AdministrationEquipmentsHomePageComponent } from './pages/administration/equipments/home/home.component';
import { AdministrationAccountsListPageComponent } from './pages/administration/accounts/list/list.component';
import { AdministrationEquipmentsListPageComponent } from './pages/administration/equipments/list/list.component';
import { AdministrationLoansListPageComponent } from './pages/administration/loans/list/list.component';
import { AdministrationNewAccountPageComponent } from './pages/administration/accounts/new/new.component';
import { AdministrationReferencesListPageComponent } from './pages/administration/references/list/list.component';
import { AdministrationTypesListPageComponent } from './pages/administration/types/list/list.component';
import { AdministrationUserOrganizationsListPageComponent } from './pages/administration/users/organizations/list/list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/account'},
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [UserAuthGuard] },

  { path: 'user/home', pathMatch: 'full', component: UserHomePageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/equipments/available/list', pathMatch: 'full', component: UserAvailableEquipmentsListPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loans/request', pathMatch: 'full', component: UserLoanRequestPageComponent, canActivate: [UserAuthGuard] },
  { path: 'user/loans/list', pathMatch: 'full', component: UserLoansListPageComponent, canActivate: [UserAuthGuard] },

  { path: 'administration/home', pathMatch: 'full', component: AdministrationHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/loans/list', pathMatch: 'full', component: AdministrationLoansListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/equipments/home', pathMatch: 'full', component: AdministrationEquipmentsHomePageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/equipments/list', pathMatch: 'full', component: AdministrationEquipmentsListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/references/list', pathMatch: 'full', component: AdministrationReferencesListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/types/list', pathMatch: 'full', component: AdministrationTypesListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/accounts/list', pathMatch: 'full', component: AdministrationAccountsListPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/accounts/new', pathMatch: 'full', component: AdministrationNewAccountPageComponent, canActivate: [AdministratorAuthGuard] },
  { path: 'administration/users/organizations/list', pathMatch: 'full', component: AdministrationUserOrganizationsListPageComponent, canActivate: [AdministratorAuthGuard] }
];
