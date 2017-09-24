import {
	Component, HostBinding, EventEmitter, Input, Output, OnInit, ViewChild,
	trigger, transition, animate,
	style, state
} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/switchMap';

import myGlobals = require('../globals');
import { UserData, RoleData, AdminService } from './admin.service';

@Component({
	templateUrl: './UserAdd.component.html',
	providers: [AdminService]
})

export class UserAddComponent {
	objUserData: UserData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	isLoading: boolean;
	roles: any[] = [];
	selectedRoles = [];
	constructor(
		private AdminService: AdminService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.isLoading = false;
		this.objUserData = new UserData();
	}

	ngOnInit() {
		this.objUserData = new UserData();
		this.AdminService.getAllRoles()
			.subscribe(data => {
				this.roles = data;
				console.log(this.roles);
			},
			error => "There was an error while retrieving roles",
			() => { });
	}

	// Get all records
	public getUserById() {
		this.AdminService.getUserByID("1")
			.subscribe(data => {
				this.objUserData = data;

			},
			error => this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error,
			() => {
				console.log('User loaded successfully...');
			}
			);
	}

	addUser() {
		let selectedRoles = [];
		this.roles.filter((item) => {
			if (item.Checked)
				selectedRoles.push(item.Name);
		});
		this.objUserData.Roles = selectedRoles.join(',');
		this.AdminService.addUser(this.objUserData)
			.subscribe(record => this.router.navigate(['/admin/user/add']),
			error => this.errorMessage = 'There was an error while creating user account. Error: ' + <any>error,
			() => {
				this.toastr.success('User account created successfully...', 'Create User Account');
				console.log('User account created successfully...');
			}
			);
	}

	gotoUsers() {
		this.router.navigate(['/admin/users']);
	}

	onEmailChange() {
		this.objUserData.UserName = this.objUserData.Email;
	}

	deleteUser(id: string) {
		if (window.confirm('Are you sure you want to delete this user?') == true) {
			this.AdminService.deleteUser(this.objUserData.Id)
				.subscribe(record => this.router.navigate(['/admin/users']),
				error => this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => {
					this.toastr.success('User account deleted successfully...', 'Delete User');
					console.log('User account deleted successfully...');
				}
				);
		}
	}
}
