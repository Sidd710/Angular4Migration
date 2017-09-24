import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { ManageUsersComponent } from './manage-users.component';
import { UserAddComponent } from './UserAdd.component';
import { UserEditComponent } from './UserEdit.component';

import { ManageRolesComponent } from './manage-roles.component';
import { RoleAddComponent } from './RoleAdd.component';
import { RoleEditComponent } from './RoleEdit.component';

import { AuthGuard } from '../auth-guard.service';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [AuthGuard],
				children: [
					{ path: 'users', component: ManageUsersComponent },
					{ path: 'user/add', component: UserAddComponent },
					{ path: 'user/:id', component: UserEditComponent },
					{ path: 'roles', component: ManageRolesComponent },
					{ path: 'role/add', component: RoleAddComponent },
					{ path: 'role/:id', component: RoleEditComponent },
					{ path: '', component: AdminDashboardComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule { }
