import {
	Component, HostBinding, EventEmitter, Input, Output, OnInit, ViewChild,
	trigger, transition, animate,
	style, state
} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../auth.service';
import myGlobals = require('../globals');
import { UserData, RoleData, AdminService } from './admin.service';

@Component({
	templateUrl: './manage-users.component.html',
	providers: [AdminService]
})

export class ManageUsersComponent {
	UsersList: UserData[];
	newUser: UserData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	isLoading: boolean;

	constructor(
		private authService: AuthService,
		private adminService: AdminService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.newUser = new UserData();
		this.isLoading = false;
	}

	ngOnInit() {
		this.getAllUsers();
	}

	// Get all records
	public getAllUsers() {
		this.isLoading = true;
		this.adminService.getAllUsers()
			.subscribe(data => {
				this.UsersList = data;
				this.isLoading = false;
			},
			error => {
				this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error;
				this.isLoading = false;
			},
			() => {
				/*let options: any = {
					animate: 'flyRight',
					positionClass: 'toast-top-center'
				};*/
				console.log('Users list loaded successfully...');
			}
			);
	}

	// On Edit - Go to Edit page
	onSelect(item: UserData) {
		this.router.navigate(['/admin/user', item.Id]);
	}

	// Deletes record with specified id
	deleteUser(id: string) {
		if (id == this.authService.userName) {
			this.errorMessage = "Cannot delete existing user account!";
			return;
		}
		if (window.confirm('Are you sure you want to delete this user?') == true) {
			this.adminService.deleteUser(id)
				.subscribe(data => {
					this.getAllUsers();
				},
				error => this.errorMessage = 'There was an error while deleting user. Error: ' + <any>error,
				() => {
					this.toastr.success('User record deleted successfully...', 'Delete User');
					console.log('User record deleted successfully...');
				}
				);
		}
	}
}
