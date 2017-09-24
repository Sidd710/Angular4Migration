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
	templateUrl: './RoleEdit.component.html',
	providers: [AdminService]
})

export class RoleEditComponent {
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
		this.route.params
			// (+) converts string 'id' to a number
			// .switchMap((params: Params) => this.ProductsService.getByID(+params['id']))
			.switchMap((params: Params) => this.AdminService.getRoleByID(params['id']))
			.subscribe((item: RoleData) => {
				this.objRoleData = item;
			},
			error => {
				this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error
			},
			() => {
				console.log('Role loaded successfully...');
			});
	}

	// Get all records
	public getRoleById() {
		this.AdminService.getRoleByID("1")
			.subscribe(data => {
				this.objRoleData = data;
			},
			error => this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error,
			() => {
				console.log('Role loaded successfully...');
			}
			);
	}

	gotoRoles() {
		this.router.navigate(['/admin/roles']);
	}

	updateRole() {
		this.AdminService.updateRole(this.objRoleData)
			.subscribe(record => this.router.navigate(['/admin/roles']),
			error => this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
			() => {
				this.toastr.success('Role record updated successfully...', 'Edit Role');
				console.log('Role record updated successfully...');
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
