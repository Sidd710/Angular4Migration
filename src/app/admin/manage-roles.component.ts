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
	templateUrl: './manage-roles.component.html',
	providers: [AdminService]
})

export class ManageRolesComponent {
	RolesList: RoleData[];
	newRole: RoleData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	isLoading: boolean;

	constructor(
		private authService: AuthService,
		private AdminService: AdminService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.isLoading = false;
	}

	ngOnInit() {
		this.getAllRoles();
	}

	// On Edit - Go to Edit page
	onSelect(item: RoleData) {
		this.router.navigate(['/admin/role', item.Id]);
	}

	// Get all records
	public getAllRoles() {
		this.isLoading = true;
		this.AdminService.getAllRoles()
			.subscribe(data => {
				this.RolesList = data;
				this.isLoading = false;
			},
			error => {
				this.errorMessage = 'There was an error while retrieving application roles. Error: ' + <any>error;
				this.isLoading = false;
			},
			() => {
				console.log('Roles list loaded successfully...');
			}
			);
	}

	// Deletes record with specified id
	deleteRole(id: string) {
		if (window.confirm('Are you sure you want to delete this role?') == true) {
			this.AdminService.deleteRole(id)
				.subscribe(data => {
					this.getAllRoles();
				},
				error => this.errorMessage = 'There was an error while deleting role. Error: ' + <any>error,
				() => {
					this.toastr.success('Application Role deleted successfully...', 'Delete Role');
					console.log('Application Role deleted successfully...');
				}
				);
		}
	}
}
