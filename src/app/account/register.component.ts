import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from '../auth.service';
import { ToastsManager }  from 'ng2-toastr';
import { FormsModule }    from '@angular/forms';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  message: string;
	errorMessage: string;
  userName: string;
  password: string;
  confirmPassword: string;

  constructor(
  		public authService: AuthService, 
      public router: Router,
      private toastr: ToastsManager) {
    
  }

  // Login using ASP.NET Identity
  register() {
		this.message = 'Creating user account ...';

    if (this.password !== this.confirmPassword)
    {
      this.errorMessage = "Confirm password does not match!";
      return;
    }

		this.authService.register(this.userName, this.password, this.confirmPassword).subscribe(() => {
				this.message = 'Registering user...';

				if (this.authService.isRegistered) {
					// Get the redirect URL from our auth service
					// If no redirect has been set, use the default
					let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';

					// Set our navigation extras object
					// that passes on our global query params and fragment
					let navigationExtras: NavigationExtras = {
						preserveQueryParams: true,
						preserveFragment: true
					};

					// Redirect the user
					this.router.navigate([redirect], navigationExtras);
					this.toastr.success('Welcome ' + this.userName + '! Please sign-in.', 'Sign-up');
				}
				else {
					this.errorMessage = 'Could create account. Please try again.';
				}
			},
			error => {
				this.errorMessage = 'Invalid Username or password. Please try again.' + <any>error,
				console.log(error);
			},
			() => {
				//console.log('User account created successfully...'); 
			}
		);
	}
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/