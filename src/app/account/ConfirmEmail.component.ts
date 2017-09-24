import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
	templateUrl: './ConfirmEmail.component.html',
})

export class ConfirmEmailComponent {
	constructor(
		public router: Router,
		private toastr: ToastsManager) {
			this.toastr.success('Email with link to reset password sent!', 'Email Sent');
	}

}
