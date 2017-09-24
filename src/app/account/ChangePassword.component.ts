import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastsManager } from 'ng2-toastr';
import { UserData, ChangePasswordData, AccountService } from './account.service';

@Component({
	templateUrl: './ChangePassword.component.html',
	providers: [AccountService]
})

export class ChangePasswordComponent {
	userName: string;
	model: ChangePasswordData;
	message: string;
	errorMessage: string;
	userInfo: UserData;

	constructor(
		public authService: AuthService,
		public accountService: AccountService,
		public router: Router,
		private toastr: ToastsManager) {
		this.model = new ChangePasswordData();
	}

	// Get all records
	public changePassword() {

		this.accountService.changePassword(
			this.model.oldPassword,
			this.model.newPassword,
			this.model.confirmPassword
		)
			.subscribe(
			data => {
				console.log(data);
				this.toastr.success('Password changed successfully...', 'Change Password');
				this.router.navigate(['/']);
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
