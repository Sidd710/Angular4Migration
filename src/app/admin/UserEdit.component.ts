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
	templateUrl: './UserEdit.component.html',
	providers: [AdminService]
})

export class UserEditComponent {
	objUserData: UserData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	isLoading: boolean;
	roles: any[] = [];

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
		this.AdminService.getAllRoles()
			.subscribe(data => { 
				this.roles = data;
			},
			error => "There was an error while retrieving roles",
			() => { });
		this.route.params
			.switchMap((params: Params) => this.AdminService.getUserByID(params['id']))
			.subscribe((item: UserData) => {
				this.objUserData = item;				
				let returnedRoles = this.objUserData.Roles.split(',');				
				this.roles.map((item) => {
					let name = returnedRoles.filter((roleName) => {
						return roleName === item.Name;
					});
					if (name.length > 0)
						item.Checked = true;
				});
		});
	}

	// Get all records
	public getUserById() {
		this.AdminService.getUserByID("1")
			.subscribe(data => { this.objUserData = data; },
			error => this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error,
			() => {
				console.log('User loaded successfully...');
			}
			);
	}

	updateUser() {
		let selectedRoles = [];
		this.roles.filter((item) => {
			if (item.Checked)
				selectedRoles.push(item.Name);
		});
		this.objUserData.Roles = selectedRoles.join(',');

		this.AdminService.updateUser(this.objUserData)
			.subscribe(record => this.router.navigate(['/admin/users']),
			error => this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
			() => {
				this.toastr.success('User record updated successfully...', 'Edit User');
				console.log('User record updated successfully...');
			});
	}

	gotoUsers() {
		this.router.navigate(['/admin/users']);
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
