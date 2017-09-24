import { Component } from '@angular/core';

@Component({
  template:  `
    <h3>ADMIN Dashboard</h3>
    <nav>
      <a routerLink="./" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      <a routerLink="./users" routerLinkActive="active">Manage Users</a>
      <a routerLink="./roles" routerLinkActive="active">Manage Roles</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/