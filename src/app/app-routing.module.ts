import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundError } from 'rxjs';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { HomeComponent } from './home/home.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { UserLoanApplicationComponent } from './user-loan-application/user-loan-application.component';
import { EmiChartComponent } from './emi-chart/emi-chart.component';

export const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent,
  },
  {
    path:'admin',
    canActivate:[AuthGuard],
    data: {role: 'admin'},
    component:AdmindashboardComponent,
  },
  {
    path:'admin/loanApplication',
    canActivate:[AuthGuard],
    data: {role: 'admin'},
    component:LoanApplicationComponent,
  },
  {
    path:'user',
    canActivate:[AuthGuard],
    data: {role: 'user'},
    component:UserdashboardComponent,
  },
  {
    path:'user/emiChart',
    canActivate:[AuthGuard],
    data: {role: 'user'},
    component:EmiChartComponent,
  },
  {
    path:'user/applyloan',
    canActivate:[AuthGuard],
    data: {role: 'user'},
    component:ApplyloanComponent,
  },
  {
    path:'user/myLoanApplication',
    canActivate:[AuthGuard],
    data: {role: 'user'},
    component:UserLoanApplicationComponent,
  },
  {
    path:'**',
    component:NotfoundComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
