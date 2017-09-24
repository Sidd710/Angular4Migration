import { Component } from '@angular/core';
import {
	Router,
	NavigationExtras
} from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountService } from './account.service';

@Component({
	templateUrl: './ForgotPassword.component.html',
	providers: [AccountService]
})

export class ForgotPasswordComponent {
	emailAddress: string = "";
	message: string;

	constructor(
		public authService: AuthService, 
		public accountService: AccountService, 
		public router: Router) {
		
	}

	forgotPassword() {
		this.accountService.forgotPassword(this.emailAddress)
			.subscribe(data => {
				this.router.navigate(['/ResetPassword']);
			},
			error => {
				this.message = "User account with this email not found! Please try again."
			},
			() => {

			});
	}

}
