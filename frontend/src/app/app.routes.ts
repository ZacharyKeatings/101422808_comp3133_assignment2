import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/new',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/view/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
