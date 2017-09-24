import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastsManager } from 'ng2-toastr';
import { UserData, AdminService } from '../admin/admin.service';

@Component({
	templateUrl: './EditProfile.component.html',
	providers: [AdminService]
})

export class EditProfileComponent {
	userName: string;
	password: string;
	message: string;
	errorMessage: string;
	objUserData: UserData;

	constructor(
		public authService: AuthService,
		public adminService: AdminService,
		public router: Router,
		private toastr: ToastsManager) {
		this.objUserData = new UserData();
		this.getUserInfo();
	}

	// Get all records
	public getUserInfo() {
		this.adminService.getUserByUserName(this.authService.userName)
			.subscribe(data => {
				this.objUserData = data;
			},
			error => this.errorMessage = 'There was an error while retrieving user info. Error: ' + <any>error,
			() => {
				console.log('Users info loaded successfully...');
			}
			);
	}

	updateUser() {
		this.adminService.updateUser(this.objUserData)
			.subscribe(record => this.router.navigate(['/']),
			error => this.errorMessage = 'There was an error while updating user profile. Error: ' + <any>error,
			() => {
				this.toastr.success('User profile updated successfully...', 'Edit Profile');
				console.log('User profile updated successfully...');
			}
			);
	}
	gotoDashboard() {
		this.router.navigate(['/']);
	}

}
