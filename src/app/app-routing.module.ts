import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IDVerificationComponent } from './id-verification/id-verification.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { HomeComponent } from './home/home.component';
import { CaptureDetailsComponent } from './capture-details/capture-details.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'idVerification', component: IDVerificationComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'viewdetails', component: ViewDetailsComponent },
  { path: 'apply', component: CaptureDetailsComponent },
  { path: 'otp', component: OtpComponent },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
