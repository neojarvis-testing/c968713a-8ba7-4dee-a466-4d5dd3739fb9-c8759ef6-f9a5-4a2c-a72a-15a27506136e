import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { CreateloanComponent } from './components/createloan/createloan.component';

const routes: Routes = [
  {
path:'admin/admineditloan',
component:AdmineditloanComponent
  },

  {
path:'login',
component:LoginComponent
  },

  {
path:'register',
component:RegistrationComponent,
  },

  {
path:'admin/adminviewfeedback',
component:AdminviewfeedbackComponent
  },

  {
path:'user/useraddfeedback',
component:UseraddfeedbackComponent
  },

  {
    path:'user/userviewfeedback',
    component:UserviewfeedbackComponent
  },
  
  {
    path:'user/userviewloan',
    component:UserviewloanComponent

  },

  {
    path:'user/userappliedloan',
    component:UserappliedloanComponent
  },

  {
    path:'admin/adminnav',
    component:AdminnavComponent
  },

  {
    path:'user/usernav',
    component:UsernavComponent
  },

  {
   path:'admin/requestedloan',
   component:RequestedloanComponent 
  },

  {
    path:'error',
    component:ErrorComponent
  },

  {
    path:'',
    component:HomeComponent
  },

  {
    path:'admin/createloan',
    component:CreateloanComponent

  },

  {
 path:'user/loanform',
 component:LoanformComponent
  },
  {
    path:'**',
    redirectTo:'/error'
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
