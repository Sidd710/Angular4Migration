import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountService } from '../account/account.service';
import { ToastsManager }  from 'ng2-toastr';

@Component({
	templateUrl: './login.component.html',
	providers: [AccountService]
})

export class LoginComponent {
	userName: string;
	password: string;
	message: string;
	errorMessage: string;
	isLoggedIn: boolean;
	isLoading: boolean;

	constructor(
		public authService: AuthService, 
		public accountService: AccountService,
		public router: Router,
		private toastr: ToastsManager) {
			this.setMessage();
	}

	setMessage() {
		this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
	}

    // Login using ASP.NET Identity
	login() {
		this.isLoading = true;
		this.message = 'Trying to log in ...';
		this.authService.login(this.userName, this.password)
			.subscribe(() => {
				this.setMessage();
				if (this.authService.isLoggedIn) {
					this.isLoggedIn = this.authService.isLoggedIn;
					// Get the redirect URL from our auth service
					// If no redirect has been set, use the default
					let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

					// Set our navigation extras object
					// that passes on our global query params and fragment
					let navigationExtras: NavigationExtras = {
						preserveQueryParams: true,
						preserveFragment: true
					};

					// Redirect the user
					this.router.navigate([redirect], navigationExtras);
					this.toastr.success('Welcome ' + this.userName + '!', 'Sign-in');
					this.errorMessage = null;
					
					// Get logged in user profile information
					this.accountService.getUserByUserName(this.authService.userName)
						.subscribe(
							data => {
								this.authService.setUserInfo(data);
							},
							error => {
								console.log('Error retrieving user profile. ' + error.text());
							},
							() => {	}
						);
				}
			},
			error => {
				this.message = 'Login failed!';
				this.errorMessage = 'The Username or password you entered is incorrect. Please try again.';
				console.log(error);
			},
			() => {
				this.isLoading = false;
			}
		);
	}

    // Login using Fake Authentication
	loginOld() {
		this.message = 'Trying to log in ...';

		this.authService.loginOld().subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Get the redirect URL from our auth service
				// If no redirect has been set, use the default
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

				// Set our navigation extras object
				// that passes on our global query params and fragment
				let navigationExtras: NavigationExtras = {
					preserveQueryParams: true,
					preserveFragment: true
				};

				// Redirect the user
				this.router.navigate([redirect], navigationExtras);
				
			}
		},
        error => this.errorMessage = 'Invalid Username or password. Please try again.' + <any>error,
        () => {
	        // this.toastr.success('Categories record added successfully...', 'Add Categories');
	        console.log('User logged in successfully...');
        });
	}

    // Logout current user
	logout() {
		this.authService.logout();
		localStorage.removeItem('currentUser');
		this.toastr.success('Thank You ' + this.userName + '!', 'Signout');
		this.setMessage();
		this.router.navigate(['/login']);
	}
}
