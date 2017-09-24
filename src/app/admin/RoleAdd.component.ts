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
	templateUrl: './RoleAdd.component.html',
	providers: [AdminService]
})

export class RoleAddComponent {
	objRoleData: RoleData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	isLoading: boolean;

	constructor(
		private AdminService: AdminService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.isLoading = false;
		this.objRoleData = new RoleData();
	}

	ngOnInit() {

	}

	gotoRoles() {
		this.router.navigate(['/admin/roles']);
	}

	addRole() {
		this.AdminService.addRole(this.objRoleData)
			.subscribe(record => this.router.navigate(['/admin/roles']),
			error => this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
			() => {
				this.toastr.success('Role record added successfully...', 'Edit Role');
				console.log('Role record added successfully...');
			}
			);
	}

	deleteRole(id: string) {
		if (window.confirm('Are you sure you want to delete this role?') == true) {
			this.AdminService.deleteRole(this.objRoleData.Id)
				.subscribe(record => this.router.navigate(['/admin/roles']),
				error => this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => {
					this.toastr.success('Products record deleted successfully...', 'Delete Products');
					console.log('Products record deleted successfully...');
				}
				);
		}
	}
}
