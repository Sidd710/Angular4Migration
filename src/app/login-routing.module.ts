import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent }       from './account/login.component';
import { RegisterComponent }    from './account/register.component';
import { ForgotPasswordComponent } from './account/ForgotPassword.component';
import { EditProfileComponent }    from './account/EditProfile.component';
import { ChangePasswordComponent }    from './account/ChangePassword.component';
import { ResetPasswordComponent } from './account/ResetPassword.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'EditProfile', component: EditProfileComponent, canActivate: [AuthGuard] },
	{ path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
	{ path: 'ResetPassword', component: ResetPasswordComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class LoginRoutingModule {}
