import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { ErrorComponent } from './components/error/error.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
 
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserhomeComponent } from './userhome/userhome.component';
 
const routes: Routes = [
 
  // { path: 'Admin', component: AdminnavComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin', component: AdminhomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'user', component: UserhomeComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'createloan', component: CreateloanComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'error', component: ErrorComponent },
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'Admin' }},
  { path: 'loanform/:loanId', component: LoanformComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'viewloan', component: ViewloanComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admineditloan/:id', component: AdmineditloanComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'requestedloan', component: RequestedloanComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'userappliedloan', component: UserappliedloanComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'userviewloan', component: UserviewloanComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'usernav', component: UsernavComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'adminnav', component: AdminnavComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'error' },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
 
 