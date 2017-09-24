import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/Shared.module';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { ManageUsersComponent } from './manage-users.component';
import { UserAddComponent } from './UserAdd.component';
import { UserEditComponent } from './UserEdit.component';

import { ManageRolesComponent } from './manage-roles.component';
import { RoleAddComponent } from './RoleAdd.component';
import { RoleEditComponent } from './RoleEdit.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent,
		AdminDashboardComponent,
		ManageUsersComponent,
		UserAddComponent,
		UserEditComponent,
		ManageRolesComponent,
		RoleAddComponent,
		RoleEditComponent
	]
})
export class AdminModule { }
