import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastsManager } from 'ng2-toastr';
import { UserData, ResetPasswordData, AccountService } from './account.service';

@Component({
	templateUrl: './ResetPassword.component.html',
	providers: [AccountService]
})

export class ResetPasswordComponent {
	userName: string;
	model: ResetPasswordData;
	message: string;
	errorMessage: string;
	userInfo: UserData;

	constructor(
		public authService: AuthService,
		public accountService: AccountService,
		public router: Router,
		private toastr: ToastsManager) {
		this.model = new ResetPasswordData();
	}

	// Get all records
	public resetPassword() {

		this.accountService.resetPassword(
			this.model.email,
			this.model.newPassword,
			this.model.token
		)
			.subscribe(
			data => {
				console.log(data);
				this.toastr.success('Password changed successfully...', 'Reset Password');
				this.router.navigate(['/login']);
			},
			error => {
				this.errorMessage = 'There was an error while changing password. Error: ' + <any>error
			},
			() => {
				console.log('Password changed successfully...');
			}
			);
	}

}
